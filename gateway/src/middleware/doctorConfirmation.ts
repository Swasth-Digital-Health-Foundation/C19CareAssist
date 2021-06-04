import { Request, Response } from 'express';
import { DOCTORS_API_KEY } from '../utils/secrets';
import APIResolver from '../utils/api-resolver';
import logger from '../utils/logger';

const transformData = (searchData: any) => {
  return {
    context: searchData.context,
    message: {
      patient: searchData.message.intent.patient,
      person: searchData.message.intent.person,
      service: {
        speciality: searchData.message.intent.speciality,
        languages: searchData.message.intent.languages,
        consultation: {
          'preferred_channel': {
            name: searchData.message.intent.preferred_channels[0].name,
          },
        },
        'fulfillment_schedule_type': searchData.message.intent.fulfillment_schedule_type,
        'consult_type': 'chat',
      },
    },
    'fulfillment_schedule_type': searchData.message.intent.fulfillment_schedule_type,
  };
};

export const doctorConfirmation = async (
  request: Request, response: Response,
): Promise<void> => {
  try {
    if (!response.locals.doctorSearchUrl) {
      throw new Error('Unable to confirm a doctor');
    }
    const apiResponse = await APIResolver.request({
      method: 'POST',
      url: `${response.locals.doctorSearchUrl}/confirm/service`,
      headers: {
        'content-type': 'application/json',
        apiToken: DOCTORS_API_KEY,
      },
      data: transformData(request.body),
      timeout: 1000,
    });
    response.send(apiResponse).status(200);
  } catch (error) {
    logger.error('Error in doctorConfirmation middleware', error);
    response.status(500).json({ code: 500, message: error.message });
  }
};

