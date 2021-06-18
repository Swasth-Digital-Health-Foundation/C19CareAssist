import axios from 'axios';
import Appointment from '../../services/appointment';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getSearchResults()', () => {
  it('should return the appropriate response when the API call is successful', async () => {
    mockedAxios.request.mockResolvedValue({ status: 200, data: {} });
    const response = await new Appointment().getConfirmation('http://getappointmenturl', {});
    expect(response).toEqual({});
  });

  it('should throw the error when the API call is unsuccessful', async () => {
    mockedAxios.request.mockRejectedValue('The API call failed!');
    try {
      await new Appointment().getConfirmation('http://getappointmenturl', {});
      throw new Error('This test is not throwing the error as expected!');
    } catch (error) {
      expect(error.code).toEqual(500);
      expect(error.message).toEqual('Unable to set & confirm the appointment with the HSP');
    }
  });
});