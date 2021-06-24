import axios from 'axios';
import logger from './logger';

class APIResolver {

  /**
   * Util to handle API operations
   * @param options 
   * @returns API response
   */
  public request = async (options: any) => {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      logger.error(`Error in API Resolver - ${error}`);
      throw error;
    }
  };
}

export default new APIResolver();