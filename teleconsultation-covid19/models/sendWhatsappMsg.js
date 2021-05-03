const fetch = require("node-fetch");
require('url-search-params-polyfill');


const send_whatsapp_msg = (data, callback) => {
    
    let phone = data.mobileNumber;

    let url = "https://api.gupshup.io/sm/api/v1/msg";

    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apiKey': '7tqxmdt0rqdkb7ajpvjuzznbenhzu3mh'
    }

    var urlSearchParams = new URLSearchParams();
    
    urlSearchParams.append("channel", "whatsapp");
    urlSearchParams.append("source", 917834811114);
    urlSearchParams.append("destination", '91' + phone);
    urlSearchParams.append("src.name", 'SwasthTeleBot');
    urlSearchParams.append("message", data.smsMassage);

    var request = {
        method: "POST",
        headers: headers,
        body: urlSearchParams
    }

     fetch(url, request)
     .then(result => {
         callback(null, true)
     }).catch(error => {
        callback(error)
     });
}


module.exports = {
    send_whatsapp_msg
}