import * as jwt from 'jsonwebtoken';
class AuthHelper {

  /**
   * Method to verify apiToken
   * @param apiToken 
   * @param gatewayPublicKey 
   * @returns true if successful
   */
  verifyApiToken = (apiToken: any, gatewayPublicKey: string): boolean => {
    jwt.verify(apiToken, Buffer.from(gatewayPublicKey, 'base64'), { algorithms: ['RS256'] });
    return true;
  };
}

export default new AuthHelper();