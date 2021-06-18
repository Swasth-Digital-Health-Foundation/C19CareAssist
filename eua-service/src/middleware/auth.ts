import { Request, Response, NextFunction } from 'express';
import authHelper from '../utils/auth-helper';
import logger from '../utils/logger';
import Auth from '../services/auth';

class AuthMiddleware {
  private gatewayPublicKey: string;
  retrieveGatewayPublicKey = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
    try {
      if (!this.gatewayPublicKey) {
        this.gatewayPublicKey = await Auth.getPublicKey();
      }
      return next();
    } catch (error) {
      logger.error('Failed to retrieve public key from the Gateway', error);
      return response.json({ code: error.code, message: error.message }).status(error.code);
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
      return response.json({ code: error.code, message: error.message }).status(error.code);
    }
  };
}

export default new AuthMiddleware();