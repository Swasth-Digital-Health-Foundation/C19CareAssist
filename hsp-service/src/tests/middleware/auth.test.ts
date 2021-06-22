import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import AuthMiddleware from '../../middleware/auth';
import AuthHelper from '../../utils/auth-helper';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Authorization middleware -> retrieveGatewayPublicKey', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockedAxios.request.mockReset();
  });

  it('should throw the error when the gateway API call is unsuccessful', async () => {
    mockedAxios.request.mockRejectedValue('Whoops!');
    expect(AuthMiddleware.gatewayPublicKey).toBe(undefined);
    await AuthMiddleware.retrieveGatewayPublicKey(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(AuthMiddleware.gatewayPublicKey).toBe(undefined);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toBeCalledWith({ code: 500, message: 'Unable to authenticate' });
  });

  it('should set gatewayPublicKey variable value as returned by the gateway API call', async () => {
    const public_key = 'somestring';
    mockedAxios.request.mockResolvedValueOnce({ status: 200, data: { public_key } });
    expect(AuthMiddleware.gatewayPublicKey).toBe(undefined);
    await AuthMiddleware.retrieveGatewayPublicKey(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(AuthMiddleware.gatewayPublicKey).toBe('somestring');
  });
});

describe('Authorization middleware -> verifyAuthToken', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    nextFunction = jest.fn();
  });

  it('should throw the error when apitoken is not present in the request headers', async () => {
    mockRequest.headers = { apitoken: undefined };

    await AuthMiddleware.verifyAuthToken(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toBeCalledWith({ code: 400, message: 'apitoken not provided in the request headers' });
  });

  it('should throw the error when apitoken verification is unsuccessful', async () => {
    AuthMiddleware.gatewayPublicKey = 'somekey';

    mockRequest.headers = { apitoken: 'sometoken' };

    await AuthMiddleware.verifyAuthToken(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(AuthMiddleware.gatewayPublicKey).toBe('somekey');
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({ code: 401, message: 'jwt malformed' });
  });

  it('should call next when apitoken is verified successfully', async () => {
    AuthMiddleware.gatewayPublicKey = 'somekey';
    AuthHelper.verifyApiToken = jest.fn().mockReturnValueOnce(true);

    mockRequest.headers = { apitoken: 'sometoken' };

    await AuthMiddleware.verifyAuthToken(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(AuthMiddleware.gatewayPublicKey).toBe('somekey');
    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);
  });
});