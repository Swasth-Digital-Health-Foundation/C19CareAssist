
import * as request from 'supertest';
import axios from 'axios';
import logger from '../../utils/logger';
import App from '../../app';
import { searchSuccessResponse, searchRequest } from '../utils/testdata';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const app = App.app;
describe('getSearchResultsForController()', () => {
  const path = '/v1/search/service';
  it('should return the appropriate response when the API call is successful', async () => {
    mockedAxios.request.mockResolvedValue({ status: 200, data :searchSuccessResponse });
    const res = await request(app)
      .post('/v1/search/service')
      .set('accesstoken', 'abcd')
      .send(searchRequest)
      .expect(200);
  });

  it ('should return the error 500 when API call to search is unsuccessful', async() => {
    const searchResponse = {
      message: 'error'
    };
    mockedAxios.request.mockResolvedValue({status: 200, data: searchResponse});
    await request(app)
      .post(path)
      .set('accesstoken', 'abcd')
      .send(searchRequest)
      .expect(500);
  });

  it ('should return the error 400 when no API token in request', async() => {
    const searchResponse = {
      message: 'valid response'
    };
    mockedAxios.request.mockResolvedValue({status: 200, data: searchResponse});
    await request(app)
      .post(path)
      .send(searchRequest)
      .expect(400);
  });
});
