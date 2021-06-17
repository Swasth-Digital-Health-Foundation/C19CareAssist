import logger from '../utils/logger';
import ApiResolver from '../utils/api-resolver';
import { GATEWAY_URL } from '../utils/secrets';

class Search {

  public getSearchResults = async (data: any, accesstoken: any): Promise<any> => {
    try {
      const apiReponse = await ApiResolver.request({
        method: 'POST',
        url: `${GATEWAY_URL}/api/v1/search/service`,
        headers: {
          'content-type': 'application/json',
          accesstoken,
        },
        data,
        timeout: 1000
      });
      return apiReponse;
    }
    catch (error) {
      logger.error(`Error in Search.getSearchResults - ${error}`);
      throw error;
    }
  };

}

export default Search;