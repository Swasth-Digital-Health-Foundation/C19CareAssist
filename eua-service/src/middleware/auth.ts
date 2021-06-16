import { Request, Response, NextFunction } from 'express';
import apiResolver from '../utils/api-resolver';
import { GATEWAY_URL } from '../utils/secrets';
import authHelper from '../utils/auth-helper';
import logger from '../utils/logger';

class AuthMiddleware {
  private gatewayPublicKey: string;
  retrieveGatewayPublicKey = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
    try {
      if (!this.gatewayPublicKey) {
        const apiResponse = await apiResolver.request({
          method: 'GET',
          url: `${GATEWAY_URL}/api/v1/publickey`
        });
        this.gatewayPublicKey = apiResponse.public_key;
      }
      return next();
    } catch (error) {
      logger.error('Failed to retrieve public key from the Gateway', error);
      return response.json({ statusCode: 401, message: 'invalid token...' }).status(401);
    }
  };

  verifyAuthToken = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
    try {
      let { apitoken } = request.headers;
      apitoken = apitoken ? apitoken.toString() : '';
      authHelper.verifyApiToken(apitoken, this.gatewayPublicKey);
      return next();
    } catch (error) {
      logger.error('Error from verifyAuthToken middleware', error.message);
      return response.json({ statusCode: 401, message: 'invalid token...' }).status(401);
    }
  };
}

export default new AuthMiddleware();