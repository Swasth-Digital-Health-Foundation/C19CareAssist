import apiResolver from '../utils/api-resolver';
import logger from '../utils/logger';
import { GATEWAY_URL } from '../utils/secrets';

class Auth {
    getPublicKey = async() : Promise<any> => {
        try {
        const apiResponse = await apiResolver.request({
            method: 'GET',
            url: `${GATEWAY_URL}/api/v1/publickey`
          });

          return apiResponse;
        }
        catch(error) {
            logger.error('Error in Auth.getPublicKey', error);
            throw error;
        }
    };
    
}

export default Auth;