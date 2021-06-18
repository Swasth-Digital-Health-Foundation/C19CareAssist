import axios from 'axios';
import Search from '../../services/search';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getSearchResults()', () => {
  it('should return the appropriate response when the API call is successful', async () => {
    mockedAxios.request.mockResolvedValue({ data: {} });
    const response = await Search.getSearchResults({}, '');
    expect(response).toEqual({});
  });

  it('should throw the error when the API call is unsuccessful', async () => {
    mockedAxios.request.mockRejectedValue('The API call failed!');
    try {
      await Search.getSearchResults({}, '');
      throw new Error('This test is not throwing the error as expected!');
    } catch (error) {
      expect(error).toEqual('The API call failed!');
    }
  });
});