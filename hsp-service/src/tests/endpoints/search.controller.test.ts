import * as request from 'supertest';
import axios from 'axios';
import App from '../../app';
import TestData from '../testdata';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const app = App.app;

describe('Search controller tests', () => {
  const path = '/v1/search/service';

  it('should return the error when unable to verify apitoken', async () => {
    mockedAxios.request.mockRejectedValue('Unable to retrieve gateway public key and verify apitoken..'); // mock API call to retrieve gateway public key
    await request(app)
      .post(path)
      .set('apitoken', TestData.apiToken)
      .send({})
      .expect('Content-Type', /json/)
      .expect({ code: 500, message: 'Unable to authenticate' })
      .expect(500);
  });

  it('should return the appropriate response when apitoken is successfully verified', async () => {
    mockedAxios.request.mockResolvedValue({ status: 200, data: { public_key: TestData.gatewayPublicKey } }); // mock API call to retrieve gateway public key
    await request(app)
      .post(path)
      .set('apitoken', TestData.apiToken)
      .send({})
      .expect('Content-Type', /json/)
      .expect(TestData.response)
      .expect(200);
  });
});