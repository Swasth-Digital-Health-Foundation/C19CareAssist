const async = require('async')
const usermodel = require('./../models/userModel')
const userHelper = require('./../models/helper')
 
/* function to store the user details, 
fetch the provider and send email to the provider for user acceptance */
const user_acceptance_request = (req, res) => {
    try {
        async.waterfall([
            (callback) => {
                userHelper.generate_request_id(req.params, callback)
            },
            (requestId, callback) => {
                userHelper.user_acceptance_request(req.params, requestId, callback)
            }
        ], (err, result) => {
            if (err) {
                res.send(err.StatusCode, err)
            } else {
                res.send(result)
            }
        })
    } catch(error) {
        res.send(500, { Status: false, message: "Something went to wrong", error: error })
    }    
}


module.exports = {
    user_acceptance_request
}