import * as request from 'supertest';
import axios from 'axios';
import App from '../../app';
import { gatewayPublicKey, onUpdateSuccessResponse, apiToken } from '../utils/testdata';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const app = App.app;
let updateReq: any;

describe('getSearchResultsForController()', () => {
  updateReq = { 
    message: { 
      type: 'consultation',
      intent: {
        speciality: 'Physician',
        fulfillment_schedule_type: 'asap',
      } 
    }
  };
  
  const path = '/v1/on_update/service';
  it('should return the appropriate response when the API call is successful', async () => {
    const searchResponse = { 
      public_key: gatewayPublicKey
    };
    mockedAxios.request.mockResolvedValue({ status: 200, data :searchResponse });
    await request(app)
      .post(path)
      .set('apitoken', apiToken)
      .send(updateReq)
      .expect(200);
  });

  it.only('should return the appropriate response when the API call is unsuccessful', async () => {
    const searchResponse = { 
      message: onUpdateSuccessResponse
    };
    mockedAxios.request.mockResolvedValue({ status: 200, data :searchResponse });
    const res = await request(app)
      .post(path)
      .send(updateReq)
      .expect(400);
  });
});