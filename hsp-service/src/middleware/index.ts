import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
import { loggerMiddleware } from './logger';

export default [
  cors({ credentials: true, origin: true }),
  express.json(),
  compression(),
  // loggerMiddleware,
];