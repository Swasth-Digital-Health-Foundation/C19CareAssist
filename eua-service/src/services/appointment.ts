import logger from '../utils/logger';
import { DOCTORS_API_KEY } from '../utils/secrets';
import ApiResolver from '../utils/api-resolver';

class Appointment {

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
        timeout: 1000,
      });

      return apiResponse;
    }
    catch (error) {
      logger.error('Error in Confirm.confirmAppointment', error);
      throw error;
    }
  };
}

export default Appointment;