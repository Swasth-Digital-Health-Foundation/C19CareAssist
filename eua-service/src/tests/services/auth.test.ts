import axios from 'axios';
import Auth from '../../services/auth';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getSearchResults()', () => {
  it('should return the public key when the gateway API call is successful', async () => {
    const public_key = 'publicKey';
    mockedAxios.request.mockResolvedValue({ data: { public_key } });
    const response: string = await Auth.getPublicKey();
    expect(response).toEqual(public_key);
  });

  it('should throw the error when the gateway API call is unsuccessful', async () => {
    mockedAxios.request.mockRejectedValue('The API call failed!');
    try {
      await Auth.getPublicKey();
      throw new Error('This test is not throwing the error as expected!');
    } catch (error) {
      expect(error).toEqual('The API call failed!');
    }
  });
});