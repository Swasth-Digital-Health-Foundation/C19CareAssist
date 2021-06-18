import EUAError from '../utils/Error';
import apiResolver from '../utils/api-resolver';
import logger from '../utils/logger';
import { GATEWAY_LOGIN_PASSWORD, GATEWAY_LOGIN_USERNAME, GATEWAY_URL } from '../utils/secrets';

class Auth {
  private accesstoken: string;
  getPublicKey = async (): Promise<string> => {
    try {
      const apiResponse = await apiResolver.request({
        method: 'GET',
        url: `${GATEWAY_URL}/api/v1/publickey`
      });

      return apiResponse.public_key;
    }
    catch (error) {
      logger.error('Error in Auth.getPublicKey', error);
      throw new EUAError(500, 'Unable to authenticate');
    }
  };

  getAccessToken = async (): Promise<string> => {
    if (this.accesstoken) {
      return this.accesstoken;
    }
    try {
      const apiResponse = await apiResolver.request({
        method: 'POST',
        url: `${GATEWAY_URL}/api/v1/login/app`,
        headers: {
          'Content-type': 'application/json'
        },
        data: {
          username: GATEWAY_LOGIN_USERNAME,
          password: GATEWAY_LOGIN_PASSWORD
        }
      });
      this.accesstoken = apiResponse.access_token;
      return this.accesstoken;
    }
    catch (error) {
      logger.error('Error in Auth.login', error);
      throw error;
    }
  };

}

export default new Auth();