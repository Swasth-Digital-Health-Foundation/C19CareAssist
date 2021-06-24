import logger from '../utils/logger';
import { DOCTORS_API_KEY } from '../utils/secrets';
import ApiResolver from '../utils/api-resolver';
import EUAError from '../utils/error';

class Appointment {

  /**
   * Method to get appointment confirmation from HSP
   * @param url 
   * @param data 
   * @returns 
   */
  getConfirmation = async (url: string, data: any) => {
    try {
      const apiResponse = await ApiResolver.request({
        method: 'POST',
        url: `${url}/confirm/service`,
        headers: {
          'content-type': 'application/json',
          apiToken: DOCTORS_API_KEY,
        },
        data: data,
        timeout: 5000,
      });

      return apiResponse;
    }
    catch (error) {
      logger.error(`Error in Confirm.confirmAppointment - ${error}`);
      throw new EUAError(500, 'Unable to set & confirm the appointment with the HSP');
    }
  };
}

export default Appointment;