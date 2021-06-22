import { Request, Response, NextFunction } from 'express';
import authHelper from '../utils/auth-helper';
import logger from '../utils/logger';
import Auth from '../services/auth';
import EUAError from '../utils/error';

class AuthMiddleware {
  private gatewayPublicKey: string;
  retrieveGatewayPublicKey = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
    try {
      if (!this.gatewayPublicKey) {
        this.gatewayPublicKey = await new Auth().getPublicKey();
      }
      return next();
    } catch (error) {
      logger.error(`Failed to retrieve public key from the Gateway - ${error}`);
      return response.status(error.code).json({ code: error.code, message: error.message });
    }
  };

  verifyAuthToken = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const { apitoken } = request.headers;
      if (!apitoken) {
        throw new EUAError(400, 'api token not provided');
      }
      authHelper.verifyApiToken(apitoken.toString(), this.gatewayPublicKey);
      return next();
    } catch (error) {
      logger.error(`Error from verifyAuthToken middleware - ${error}`);
      if (!error.code || error.code === 'string') {
        return response.status(401).json({code: 401, message: 'Unauthorized request'});
      }
      return response.status(error.code).json({ code: error.code, message: error.message });
    }
  };
}

export default new AuthMiddleware();