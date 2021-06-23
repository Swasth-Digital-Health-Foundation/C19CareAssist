import * as request from 'supertest';
import axios from 'axios';
import App from '../../app';
import {confirmResponse, gatewayPublicKey, apiToken} from '../utils/testdata';
import AuthMiddleware from '../../middleware/auth';
import AuthHelper from '../../utils/auth-helper';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const app = App.app;
const path = '/v1/confirm/service';

describe('Confirm Controller tests', () => {

  const confirmReq = {
    message: 'searchRequest'
  };
  it('return appropriate response on success request', async() => {
    mockedAxios.request.mockResolvedValue({ status: 200, data: { public_key: gatewayPublicKey } });
    await request(app)
      .post(path)
      .set('apitoken', apiToken)
      .send(confirmReq)
      .expect(200)
      .expect(confirmResponse);
  });

  it('return error response on request with no apitoken', async() => {
    mockedAxios.request.mockResolvedValue({ status: 200, data: { public_key: gatewayPublicKey } });
    await request(app)
      .post(path)
      .send(confirmReq)
      .expect(400);
  });
});