import axios from 'axios';
import logger from './logger';

class APIResolver {
  public async request(options: object) {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      logger.error('Error in API Resolver ', error);
      if (error.code === 'ECONNABORTED') return null;
      else throw error;
    }
  }
}

export default new APIResolver();
