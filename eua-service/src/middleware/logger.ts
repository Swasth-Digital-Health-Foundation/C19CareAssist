import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.path !== '/status') logger.debug(`Request logged: ${req.method} ${req.path}`);
  next();
};
