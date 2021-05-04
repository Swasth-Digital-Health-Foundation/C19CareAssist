const fetch = require("node-fetch");
require('url-search-params-polyfill');
const config = require('../env-variables');
var geturl = require("url");
const fs = require('fs');
const FormData = require('form-data');   
const path = require("path");

class KaleyraWhatsAppProvider {

  constructor() {
    this.url = config.kaleyra.sendMessageUrl;
    this.url = this.url.replace('{{sid}}', config.kaleyra.sid);
  }
  
  processMessageFromUser(req) {
    try {
      let requestBody = geturl.parse(req.url, true).query;
      
      let reformattedMessage = {};
      reformattedMessage.user = { 
        mobileNumber: requestBody.from.slice(2)
      }
      reformattedMessage.extraInfo = {
        whatsAppBusinessNumber: requestBody.wanumber
      }
      
      let type = requestBody.type;
      if(type == 'text') {
        reformattedMessage.message = {
          type: type,
          input: requestBody.body
        };
      } else {
        reformattedMessage.message = {
          type: 'unknown',
          input: ''
        }
      }

      return reformattedMessage;
    } catch(err) {
      console.error('Error while processing message from user: ' + err);
      return undefined;
    }
  }

  async sendMessageToUser(user, outputMessages, extraInfo) {
    for(let message of outputMessages) {
      let phone = user.mobileNumber;

      let headers = {
        'api-key': config.kaleyra.apikey
      }

      let form = new FormData();
      
      form.append("channel", "whatsapp");
      form.append("from", extraInfo.whatsAppBusinessNumber);
      form.append("to", '91' + phone);

      if(typeof(message) == 'string') {
        form.append("type", 'text');
        form.append("body", message);
      } else if (message.type == 'media') {
        let buffer;
        if (message.category == 'msg_image') {
          buffer = fs.readFileSync(path.resolve(__dirname, `../../resources/assets/message-images/${message.output}`));
          form.append("caption", message.caption || '');
        } else {
          buffer = fs.readFileSync(path.resolve(__dirname, `../../pdf-output/${message.output}`));
        }

        form.append("type", 'media');
        form.append("media", buffer, {
          contentType: 'text/plain',
          name: 'file',
          filename: message.output,
        });
      } else {
        form.append("type", message.type);
        form.append("body", message.output);
      }
      
      var request = {
          method: "POST",
          headers: headers,
          body: form
      }

      const response = await fetch(this.url, request).then(res => res.json());
      if (response && message.type === 'media' && message.category == 'vitals') {
        fs.unlinkSync(`nodejs/pdf-output/${message.output}`);
      }
    }
  }

}

module.exports = new KaleyraWhatsAppProvider();