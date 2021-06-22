import HSPError from '../utils/error';
import apiResolver from '../utils/api-resolver';
import logger from '../utils/logger';
import { GATEWAY_URL } from '../utils/secrets';

class AuthService {
  getPublicKey = async (): Promise<string> => {
    try {
      const apiResponse = await apiResolver.request({
        method: 'GET',
        url: `${GATEWAY_URL}/api/v1/publickey`
      });

      return apiResponse.public_key;
    }
    catch (error) {
      logger.error(`Error in Auth.getPublicKey - ${error}`);
      throw new HSPError(500, 'Unable to authenticate');
    }
  };

}

export default AuthService;