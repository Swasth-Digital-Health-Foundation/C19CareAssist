const sendMessage = async (requestBody) => {};

const sendProviderNotificationMessage = async (mobile, message) => {
  const requestBody = {
    body: {
      to: '',
      ttl: 86400,
      type: 'template',
      template: {
        namespace: '7d08a43e_5c20_45e3_a26e_aa9e0e4ab729',
        name: 'sender_notification',
        language: {
          policy: 'deterministic',
          code: 'en',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: '${requestID}',
              },
              {
                type: 'text',
                text: '${pinCode}',
              },
              {
                type: 'text',
                text: '${city}',
              },
            ],
          },
          {
            type: 'button',
            sub_type: 'quick_reply',
            index: '0',
            parameters: [
              {
                type: 'payload',
                payload: 'SENDER_NOTIFICATOIN:${senderID}:ACCEPT',
              },
            ],
          },
          {
            type: 'button',
            sub_type: 'quick_reply',
            index: '1',
            parameters: [
              {
                type: 'payload',
                payload: 'SENDER_NOTIFICATOIN:${senderID}:REJECT',
              },
            ],
          },
        ],
      },
    },
  };
  requestBody.body.to = `91${mobile}`;
  requestBody.body.template.components[0].parameters[0].text = message.id;
  requestBody.body.template.components[0].parameters[1].text = message.pin_code;
  requestBody.body.template.components[0].parameters[2].text = message.city;

  await sendMessage(requestBody);
};

const sendNoProviderFoundMessage = async (mobile, message) => {
};

const sendAcceptedProviderDetails = async (mobile, message) => {
  const requestBody = {
    body: {
      to: '',
      ttl: 'P1D',
      type: 'hsm',
      hsm: {
        namespace: '7d08a43e_5c20_45e3_a26e_aa9e0e4ab729',
        element_name: 'supplier_found',
        language: {
          policy: 'deterministic',
          code: 'en',
        },
        localizable_params: [
          {
            default: '${DEALER DETAILS}',
          },
        ],
      },
    },
  };
  requestBody.body.to = `91${mobile}`;
  requestBody.body.hsm.localizable_params[0].default = message.providerDetails;

  await sendMessage(requestBody);
};

module.exports = {
  sendProviderNotificationMessage,
  sendNoProviderFoundMessage,
  sendAcceptedProviderDetails,
};
