import { Request, Response, NextFunction } from 'express';
import APIResolver from '../utils/api-resolver';
import logger from '../utils/logger';

export const newMiddleware = async (
  request: Request, response: Response, next: NextFunction,
): Promise<void> => {
  try {
    const apiResponse = await APIResolver.request({
      method: 'POST',
      url: '/',
      headers: {
        'content-type': 'application/json',
      },
      data: request.body,
      timeout: 1000,
    });
    response.locals.newMiddlewareResponse = apiResponse;
    next();
  } catch (error) {
    logger.error('Error in newMiddleware', error);
    throw error;
  }
};
