import * as express from 'express';
import { CONTEXT_APP_URL } from '../utils/secrets';
import logger from '../utils/logger';
import ControllerInterface from './interface';
import Search from '../services/search';
import Appointment from '../services/appointment';
import EUAError from '../utils/error';
import Schema from '../utils/schema';

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
    this.router.post(this.path, this.validateRequestBody, this.search, this.setAppointment);
  }

  /**
   * Method to validate search request body
   * @param request 
   * @param response 
   * @param next 
   * @returns 
   */
  public validateRequestBody = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      await Schema.searchRequestSchema.validateAsync(request.body, { abortEarly: false });
      next();
    } catch (error) {
      logger.error(`Error in validateRequestBody middleware - ${error}`);
      return response.status(400).json({ code: 400, message: error.details });
    }
  };

  /**
   * Method to handle search requests 
   * @param request 
   * @param response 
   * @param next 
   * @returns 
   */
  private search = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { accesstoken } = request.headers;
      if (!accesstoken) {
        throw new EUAError(400, 'Access token not found in the request headers.');
      }
      const apiReponse = await new Search().getSearchResults(request.body, accesstoken);
      response.locals.providerUrl = apiReponse.services?.[0]?.provider?.api?.url;
      if (!response.locals.providerUrl) {
        throw new EUAError(500, 'Unable to confirm appointment with a doctor - URL not available.');
      }
      next();
    } catch (error) {
      logger.error(`Error in search middleware - ${error}`);
      return response.status(error.code || 500).json({ code: error.code || 500, message: error.message });
    }
  };

  /**
   * Method to confirm doctor appointments
   * @param request 
   * @param response 
   */
  private setAppointment = async (request: express.Request, response: express.Response) => {
    try {
      const data = transformData(request.body);

      const apiResponse = await new Appointment().getConfirmation(response.locals.providerUrl, data);
      response.send(apiResponse).status(200);
    } catch (error) {
      logger.error(`Error in setAppointment middleware - ${error}`);
      response.status(error.code || 500).json({ code: error.code || 500, message: error.message });
    }
  };
}

export default new SearchController();
