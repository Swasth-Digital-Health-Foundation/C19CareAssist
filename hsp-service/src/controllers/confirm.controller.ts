import * as express from 'express';
import ControllerInterface from './interface';
import Auth from '../middleware/auth';

class ConfirmController implements ControllerInterface {
  private readonly path: string = '/v1/confirm/service';
  readonly router: express.Router = express.Router();

  private readonly stubbedResponse = { // TODO this needs to be amended to send the computed response
    consultation_service: {
      consultation: {
        assign_at: '2021-06-21T09:54:33.000Z',
        consult_time: '',
        consult_duration_promise: 30,
        consult_url: null,
        id: '11444417-e683-4ab7-88b8-245769d4b07d',
        status: 'CONFIRMED',
        doctor: {
          doctorid: 132850,
          name: 'Dr. Waseem Mirza',
          languages: [
            'english'
          ],
          supportedchannels: [
            {
              id: 2,
              name: 'audio'
            }
          ]
        }
      }
    },
    success: true,
    message: 'Successfully Created Conversation',
    provider: {
      id: '1mg HSP',
      type: 'HSP',
      name: '1MG',
      api: {
        type: 'base',
        url: 'https://stagapi.1mgdoctors.com/api/v1/bhs'
      }
    }
  };

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(this.path, Auth.retrieveGatewayPublicKey, Auth.verifyAuthToken, this.confirm.bind(this));
  }

  confirm(request: express.Request, response: express.Response, next: express.NextFunction) {
    response.send(this.stubbedResponse);
    return next();
  }
}

export default new ConfirmController;