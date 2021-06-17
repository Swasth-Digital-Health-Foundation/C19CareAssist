import * as jwt from 'jsonwebtoken';
class AuthHelper {
  verifyApiToken = (apiToken: string, gatewayPublicKey: string): boolean => {
    jwt.verify(apiToken, Buffer.from(gatewayPublicKey, 'base64'), { algorithms: ['RS256'] });
    return true;
  };
}

export default new AuthHelper();
