import HSPError from '../utils/error';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import AuthHelper from '../utils/auth-helper';
import AuthService from '../services/auth';
class Auth {
  public gatewayPublicKey: string;
  retrieveGatewayPublicKey = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
    try {
      if (!this.gatewayPublicKey) {
        this.gatewayPublicKey = await new AuthService().getPublicKey();
      }
      return next();
    } catch (error) {
      logger.error(`Failed to retrieve public key from the Gateway - ${error}`);
      return response.status(error.code || 500).json({ code: error.code || 500, message: error.message });
    }
  };

  verifyAuthToken = async (request: Request, response: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const { apitoken } = request.headers;
      if (!apitoken) {
        throw new HSPError(400, 'apitoken not provided in the request headers');
      }
      AuthHelper.verifyApiToken(apitoken, this.gatewayPublicKey);
      return next();
    } catch (error) {
      logger.error(`Error from verifyAuthToken middleware - ${error.message}`);
      return response.status(error.code || 401).json({ code: error.code || 401, message: error.message });
    }
  };
}

export default new Auth();