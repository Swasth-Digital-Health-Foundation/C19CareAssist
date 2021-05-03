const AWS = require('aws-sdk')
const config = require('./../config/config')

AWS.config.update({
    accessKeyId: config.aws_ses_access_key,
    secretAccessKey: config.aws_ses_secret_key,
    region: config.aws_ses_region
    })

const ses       = new AWS.SES({apiVersion: config.aws_ses_api_version});

const send_mail = (data, callback) => {
    const params = {
        Destination: {
            ToAddresses: [data.toMail]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: data.message
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: data.subject
            }
        },
        ReturnPath: data.fromMail,
        Source: data.fromMail,
    };

    ses.sendEmail(params, (err, response) => {
        if (err) {
            return console.log(err, err.stack);
        } else {
            callback(null, {statusCode: 200, message: "Mail sent successfully", data: response })
        }
    });
}



module.exports = {
    send_mail
}