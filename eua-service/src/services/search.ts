import logger from '../utils/logger';
import ApiResolver from '../utils/api-resolver';
import { GATEWAY_URL } from '../utils/secrets';
import EUAError from '../utils/error';

class Search {

  public getSearchResults = async (data: any, accesstoken: any): Promise<any> => {
    try {
      const apiResponse = await ApiResolver.request({
        method: 'POST',
        url: `${GATEWAY_URL}/api/v1/search/service`,
        headers: {
          'content-type': 'application/json',
          accesstoken,
        },
        data,
        timeout: 1000
      });
      if (apiResponse.statusCode && apiResponse.statusCode !== 200) {
        throw new EUAError(apiResponse.statusCode, apiResponse.message);
      }
      return apiResponse;
    }
    catch (error) {
      logger.error(`Error in Search.getSearchResults - ${error}`);
      if (typeof error.code === 'string') {
        throw new EUAError(500, 'Unable to retrieve search results');
      }
      throw new EUAError(error.code, error.message);
    }
  };

}

export default Search;