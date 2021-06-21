import * as Joi from 'joi';

class Schema {
  searchRequestSchema = Joi.object({
    message: Joi.object({
      type: Joi.string().required(),
      intent: Joi.object({
        speciality: Joi.string().required(),
        fulfillment_schedule_type: Joi.string().required(),
        languages: Joi.array().required(),
        type: Joi.object({
          type: Joi.string().required(),
          subtype: Joi.string().required(),
        }),
        person: Joi.object().required(),
        patient: Joi.object({
          first_name: Joi.string().required(),
          dob: Joi.string().required(),
          gender: Joi.string().required(),
          clinical_notes: Joi.object().required(),
          contact: Joi.object().required(),
        }).required(),
        preferred_channels: Joi.array().required(),
      }).required(),
    }).required(),
    context: Joi.object({
      app: Joi.object({
        type: Joi.string().required(),
        name: Joi.string().required(),
        id: Joi.string().required(),
        api: Joi.object({
          type: Joi.string().required(),
          url: Joi.string().required(),
          version: Joi.string().required(),
        }).required()
      }).required()
    }).required()
  });
}

export default new Schema();