import * as request from 'supertest';
import axios from 'axios';
import App from '../../app';
import TestData from '../testdata';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const app = App.app;
const path = '/v1/confirm/service';

describe('Confirm Controller tests', () => {

  const confirmReq = {
    message: 'searchRequest'
  };
  it('return appropriate response on success request', async () => {
    mockedAxios.request.mockResolvedValue({ status: 200, data: { public_key: TestData.gatewayPublicKey } });
    await request(app)
      .post(path)
      .set('apitoken', TestData.apiToken)
      .send(confirmReq)
      .expect(200)
      .expect(TestData.confirmResponse);
  });

  it('return error response on request with no apitoken', async () => {
    mockedAxios.request.mockResolvedValue({ status: 200, data: { public_key: TestData.gatewayPublicKey } });
    await request(app)
      .post(path)
      .send(confirmReq)
      .expect(400);
  });
});