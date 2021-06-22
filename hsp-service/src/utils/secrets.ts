import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV: string = process.env.NODE_ENV || 'dev';

config({ path: resolve(__dirname, `../../env.${NODE_ENV}`) });

export const PORT: string = process.env.PORT || '5000';
export const LOG_LEVEL: string = process.env.LOG_LEVEL || 'debug';
export const GATEWAY_URL: string = process.env.GATEWAY_URL || 'http://localhost:3000';