import axios from 'axios';
import Search from '../../services/search';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getSearchResults()', () => {
  it('should return the appropriate response when the API call is successful', async () => {
    const expectedResponse = { message: 'Valid response!' };
    mockedAxios.request.mockResolvedValue({ status: 200, data: expectedResponse });
    const response = await new Search().getSearchResults({}, '');
    expect(response).toEqual(expectedResponse);
  });

  it('should return the appropriate response when the API call is successful and statusCode = 200', async () => {
    const expectedResponse = { statusCode: 200, message: 'Valid response!' };
    mockedAxios.request.mockResolvedValue({ status: 200, data: expectedResponse });
    const response = await new Search().getSearchResults({}, '');
    expect(response).toEqual(expectedResponse);
  });

  it('should throw the error when the API call is unsuccessful', async () => {
    const expectedResponse = { statusCode: 500, message: 'The API call failed!' };
    mockedAxios.request.mockResolvedValue({ status: 200, data: expectedResponse });
    try {
      await new Search().getSearchResults({}, '');
      throw new Error('This test is not throwing the error as expected!');
    } catch (error) {
      expect(error.code).toEqual(expectedResponse.statusCode);
      expect(error.message).toEqual(expectedResponse.message);
      expect(Object.keys(error).sort()).toEqual(['code', 'message'].sort());
    }
  });
});