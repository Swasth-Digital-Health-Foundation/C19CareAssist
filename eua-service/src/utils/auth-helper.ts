/* eslint-disable @typescript-eslint/ban-types */
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

import {
  ACCESSTOKEN_SECRET,
  REFRESHTOKEN_SECRET,
} from './secrets';
import logger from '../utils/logger';

class AuthHelper {
  verify(type: string, token: string) {
    let secret: any = null,
      maxAge = '1h';
    switch (type) {
      case 'access_token':
        secret = ACCESSTOKEN_SECRET;
        maxAge = '24h';
        break;
      case 'refresh_token':
        secret = REFRESHTOKEN_SECRET;
        maxAge = '15d';
        break;
      default:
        break;
    }
    try {
      const data: any = jwt.verify(token, secret, { maxAge });
      const hasExpired = moment.utc(data.exp).isBefore(moment.utc());
      if (!hasExpired) return data;
      else return false;
    } catch (error) {
      logger.error('jwt verification failed.', error);
      return false;
    }
  }
}

export default new AuthHelper();
