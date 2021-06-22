export const searchSuccessResponse = { 
  services:[{
    speciality:'physician',
    consultation:
                      {languages:
                          ['english'],
                      supportedchannels:[
                        {id:2,name:'audio'}],
                      consult_time:'2021-06-21T10:08:42.854+00:00'},
    provider:{id:'1mg-HSP',type:'HSP',name:'1mg HSP',
      api:{type:'base',url:'https://stagapi.1mgdoctors.com/api/v1/bhs'}},
    fulfillment_schedule_type:'asap'}]
};
export const searchRequest = { 
  message: { 
    type: 'consultation',
    intent: {
      languages: ['english'],
      speciality: 'Physician',
      fulfillment_schedule_type: 'asap',
      person: {
        first_name: 'Vipul Maan',
        dob: '1996-06-17',
        gender: 'male',
        contact: {
          mobile: {
            country_code: '+91',
            number: '9643024601'
          }
        }
      },
      patient: {
        first_name: 'Vipul Maan',
        dob: '1996-06-17',
        gender: 'male',
        contact: {
          mobile: {
            country_code: '+91',
            number: '9643024601'
          }
        },
        clinical_notes: {
          other_info: {
            self_assessment: {
              questionnaireResponse: [
                {
                  question: 'do you have fever?',
                  selectedOptions: [
                    'a'
                  ],
                  options: {
                    a: 'yes',
                    b: 'no'
                  }
                }
              ]
            }
          }
        }
      },
      preferred_channels: [
        {
          id: 0,
          name: 'audio'
        }
      ],
    }
  },
  context: {
    app: {
      type: 'EUA',
      name: 'Swasth EUA',
      api: {
        type: 'base',
        url: 'https://domain-swasth/open-eua/',
        version: 'v1'
      },
      id: 'Swasth_EUA'
    }
  }
};
export const gatewayPublicKey = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9MwIDAQAB-----END PUBLIC KEY-----';

export const onUpdateSuccessResponse = {};

export const apiToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA';