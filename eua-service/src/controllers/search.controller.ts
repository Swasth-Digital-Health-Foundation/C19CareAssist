import * as express from 'express';
import ApiResolver from '../utils/api-resolver';
import { GATEWAY_URL, DOCTORS_API_KEY, CONTEXT_APP_URL } from '../utils/secrets';
import logger from '../utils/logger';
import ControllerInterface from './interface';

/**
 * Sanitise the request body so it can be used to hit the confirm service endpoint and set an
 * appointment
 * @param searchData Request body
 * @returns sanitised request body to be used to hit the /confirm service
 */
const transformData = (searchData: any) => {
  searchData.context.app.api.url = CONTEXT_APP_URL;
  return {
    context: searchData.context,
    message: {
      patient: searchData.message.intent.patient,
      person: searchData.message.intent.person,
      service: {
        speciality: searchData.message.intent.speciality,
        languages: searchData.message.intent.languages,
        consultation: {
          'preferred_channel': {
            name: searchData.message.intent.preferred_channels[0].name,
          },
        },
        'fulfillment_schedule_type': searchData.message.intent.fulfillment_schedule_type,
        'consult_type': 'chat',
      },
    },
    'fulfillment_schedule_type': searchData.message.intent.fulfillment_schedule_type,
  };
};

class SearchController implements ControllerInterface {
  private readonly path: string = '/v1/search/service';
  readonly router: express.Router = express.Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path, this.search, this.setAppointment);
  }

  private search = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { accesstoken } = request.headers;
      if (!accesstoken) {
        throw new Error('Access token not found in the request headers.');
      }
      const apiReponse = await ApiResolver.request({
        method: 'POST',
        url: `${GATEWAY_URL}/api/v1/search/service`,
        headers: {
          'content-type': 'application/json',
          accesstoken,
        },
        data: request.body,
        timeout: 1000
      });
      response.locals.providerUrl = apiReponse.services?.[0]?.provider?.api?.url || 'https://stagapi.1mgdoctors.com/api/v1/bhs';
      if (!response.locals.providerUrl) {
        throw new Error('Unable to confirm appointment with a doctor - URL not available.');
      }
      next();
    } catch (error) {
      logger.error('Error in search middleware', error);
      return response.status(500).json({ code: 500, message: error.message });
    }
  };

  private setAppointment = async (request: express.Request, response: express.Response) => {
    try {
      const apiResponse = await ApiResolver.request({
        method: 'POST',
        url: `${response.locals.providerUrl}/confirm/service`,
        headers: {
          'content-type': 'application/json',
          apiToken: DOCTORS_API_KEY,
        },
        data: transformData(request.body),
        timeout: 1000,
      });
      response.send(apiResponse).status(200);
    } catch (error) {
      logger.error('Error in setAppointment middleware', error);
      response.status(500).json({ code: 500, message: error.message });
    }
  };
}

export default new SearchController();
