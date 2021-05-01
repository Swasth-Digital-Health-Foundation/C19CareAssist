const dbConn    = require('./../config/dbconect')
const sendEmail  = require('./sendEmail') 

//function to generate request id
const generate_request_id = (data, callback) => {
    
    dbConn.query("SELECT id, `request_id` FROM teleconsultation_service ORDER BY id DESC LIMIT 1", (err, res) => {
        if(err) {
          callback(err)
        } else {
          if(res.length) {
            let requestcode = res[0].request_id
            let requestNum  = parseInt(requestcode.substring(12));
            
            requestNum += 1;
            
            (requestNum.length = 1) ? requestNum = '0' + requestNum : requestNum;

            let requestId = 'TELECONCOVID' + requestNum;
            
            callback(null, requestId)
          
          } else {
            callback(null, 'TELECONCOVID01')
          }
          
        }
    });
}

// function for storing the users detail and send mails to providers
const user_acceptance_request = (data, requestId, callback) => {

    var caller_no     = data.caller_no
    var request_time  = data.request_time

    let request_data = {request_id: requestId, caller_number: caller_no, request_time: request_time }
    
    try {
        
        let sql = "INSERT INTO teleconsultation_service SET ?";
        
        dbConn.query(sql, request_data, (err, results) => {
            
            if(err) {
            
                callback(err)
            
            } else {
            
                get_provider_detail((error, providerResp) => {
            
                    if(error) {
            
                        callback(error)
            
                    } else {
                        
                        let toMail          = providerResp[0].email_id
                        let dateTimeValue   = data.request_time.split(' ')
                        let dateValue       = dateTimeValue[0].split('-')
                        let requestDateTime = dateValue[2] + '-' + dateValue[1] + '-' + dateValue[0] + ' ' + dateTimeValue[1]
                        const fromMail      = 'covidteleconsultation@swasthapp.org'
                        let subject         = 'Consultaion request - ' + requestId
                        let message         = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><div style="width: 500px; margin: 10px;"><p><b>Hi</b></p><p>You have been allocated a consultation request. Please find the details below and take the appropriate action as soon as possible:</p><table border="1" style="width: 100%; border-collapse: collapse;"><tr> <th style="padding: 5px;">S.No</th> <th style="padding: 5px;">Request ID</th> <th style="padding: 5px;">Caller number</th> <th style="padding: 5px;">Request time</th> <th style="padding: 5px;" colspan="2">Action</th> </tr> <tr> <td style="padding: 5px;">S.No</td> <td style="padding: 5px;">'+ requestId +'</td> <td style="padding: 5px;">'+ data.caller_no +'</td> <td style="padding: 5px;">'+ requestDateTime +'</td> <td style="padding: 5px;">Accept</td> <td style="padding: 5px;">Reject</td> </tr> </table> </div> </body> </html>'
                        
                        sendEmail.sendmail({fromMail, toMail, subject, message}, (err, mailResp) => {
                            if(err) {
                                callback(err)
                            } else {

                                let requestCount = providerResp[0].requestCount + 1;
                                // update the requestcount for the provider
                                dbConn.query("UPDATE providers SET request_count = "+ requestCount +" WHERE id = "+ providerResp[0].id +"", (err, updateresp) => {
                                
                                    if(err) {
                                
                                        callback(err)
                                
                                    } else {
                                
                                        callback(null, {statusCode: 200, message: "User request successfully processed"})
                                
                                    }
                                })
                            }
                        })
                    }
                })
            }    
        });
    
    } catch(error) {
    
        callback(error)
    
    }    
}

// function to fetch the provider detail based on the least request sent count
const get_provider_detail = (callback) => {
    
    dbConn.query("SELECT id, name, phone_number, email_id, MIN(request_count) as requestCount FROM providers LIMIT 1", (err, res) => {
    
        if(err) {
    
            callback(err)
    
        } else {
    
            callback(null, res)
    
        }
    });
}

module.exports = {
    user_acceptance_request,
    generate_request_id
}