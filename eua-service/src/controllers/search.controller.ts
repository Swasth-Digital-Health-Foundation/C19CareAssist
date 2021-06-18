import * as express from 'express';
import { CONTEXT_APP_URL } from '../utils/secrets';
import logger from '../utils/logger';
import ControllerInterface from './interface';
import Search from '../services/search';
import Auth from '../services/auth';
import Appointment from '../services/appointment';
import EUAError from '../utils/Error';

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

  private getSearchData = async (requestBody: any, accesstoken: any) => {
    try {
      let apiReponse = await Search.getSearchResults(requestBody, accesstoken);
      if (!apiReponse) {
        accesstoken = await Auth.login();
        apiReponse = await Search.getSearchResults(requestBody, accesstoken);
      }
      return apiReponse;
    } catch (error) {
      logger.error(`Error while fetching search data or logging in - ${error}`);
      throw error;
    }
  };

  private search = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { accesstoken } = request.headers;
      if (!accesstoken) {
        throw new EUAError(400, 'Access token not found in the request headers.');
      }
      const searchData = await this.getSearchData(request.body, accesstoken);
      response.locals.providerUrl = searchData.services?.[0]?.provider?.api?.url;
      if (!response.locals.providerUrl) {
        throw new EUAError(500, 'Unable to confirm appointment with a doctor - URL not available.');
      }
      next();
    } catch (error) {
      logger.error('Error in search middleware', error);
      return response.status(error.code || 500).json({ code: error.code, message: error.message });
    }
  };

  private setAppointment = async (request: express.Request, response: express.Response) => {
    try {
      const data = transformData(request.body);

      const apiResponse = await new Appointment().getConfirmation(response.locals.providerUrl, data);
      response.send(apiResponse).status(200);
    } catch (error) {
      logger.error('Error in setAppointment middleware', error);
      response.status(error.code || 500).json({ code: error.code, message: error.message });
    }
  };
}

export default new SearchController();
