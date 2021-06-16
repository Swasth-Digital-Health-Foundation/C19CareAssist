import { Request, Response, NextFunction } from 'express';
import apiResolver from '../utils/api-resolver';
import { GATEWAY_URL } from '../utils/secrets';
import authHelper from '../utils/auth-helper';
import logger from '../utils/logger';

export let gatewayPublicKey: Promise<string>;

/**
 * Authenticate request jwt
 */

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const headers = req.headers || {};
  const at = headers['accesstoken'] ? headers['accesstoken'].toString() : '';
  try {
    const decoded = authHelper.verify('access_token', at);
    if (decoded) {
      req.headers['authenticated-client'] = decoded.data;
      next();
    }
    else {
      res.send({ statusCode: 401, message: 'invalid token...' });
    }
  } catch (error) {
    logger.error('Auth Failed', error);
    res.send({ statusCode: 401, message: 'invalid token...' });
  }
};

export const retrieveGatewayPublicKey = async (request: Request, response: Response, next: NextFunction): Promise<string | void> => {
  try {
    gatewayPublicKey = apiResolver.request({
      method: 'GET',
      url: `${GATEWAY_URL}/publickey`
    });
    return gatewayPublicKey;
  } catch (error) {
    logger.error('Failed to retrieve public key from the Gateway', error);
    next(error);
  }
};