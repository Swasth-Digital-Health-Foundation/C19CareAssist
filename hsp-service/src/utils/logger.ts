import * as winston from 'winston';
import { LOG_LEVEL } from './secrets';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
  ),
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
      )
    }),
    new winston.transports.File({
      filename: `./log/${new Date().toISOString().slice(0, 10)}-results.log`,
    })
  ],
});

export default logger;