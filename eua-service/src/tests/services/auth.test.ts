import axios from 'axios';
import Auth from '../../services/auth';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getSearchResults()', () => {
  it('should return the public key when the gateway API call is successful', async () => {
    const public_key = 'publicKey';
    mockedAxios.request.mockResolvedValue({ status: 200, data: { public_key } });
    const response: string = await new Auth().getPublicKey();
    expect(response).toEqual(public_key);
  });

  it('should throw the error when the gateway API call is unsuccessful', async () => {
    mockedAxios.request.mockRejectedValue('The API call failed!');
    try {
      await new Auth().getPublicKey();
      throw new Error('This test is not throwing the error as expected!');
    } catch (error) {
      expect(error.message).toEqual('Unable to authenticate');
      expect(error.code).toEqual(500);
    }
  });
});