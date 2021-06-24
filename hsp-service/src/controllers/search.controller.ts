import * as express from 'express';
import ControllerInterface from './interface';
import Auth from '../middleware/auth';
class SearchController implements ControllerInterface {
  private readonly path: string = '/v1/search/service';
  readonly router: express.Router = express.Router();

  private readonly stubbedResponse = { // TODO this needs to be amended to send the computed response
    services: [{
      speciality: 'physician',
      consultation: {
        languages: ['english'],
        supportedchannels: [{ id: 2, name: 'audio' }],
        consult_time: '2021-06-21T10:08:42.854+00:00'
      },
      provider: {
        id: '1mg-HSP',
        type: 'HSP',
        name: '1mg HSP',
        api: {
          type: 'base',
          url: 'https://stagapi.1mgdoctors.com/api/v1/bhs'
        }
      },
      fulfillment_schedule_type: 'asap'
    }]
  };

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path, Auth.retrieveGatewayPublicKey, Auth.verifyAuthToken, this.search.bind(this));
  }

  /**
   * Method to handle search request
   * @param request 
   * @param response 
   * @param next 
   * @returns a response with a list of health providers
   */
  search(request: express.Request, response: express.Response, next: express.NextFunction) {
    response.send(this.stubbedResponse);
    return next();
  }
}

export default new SearchController;