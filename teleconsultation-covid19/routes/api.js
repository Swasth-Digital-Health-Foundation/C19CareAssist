const express = require('express')
const router = express.Router()
const Middleware = require('./middleware')
const Users = require('./../controllers/users')


router.get('/user_acceptance_request/:caller_no/:request_time', Middleware.UserMiddleware, Users.user_acceptance_request)
router.get('/user_fullfilment_request/:request_id/:authtoken/:status', Middleware.UserMiddleware, Users.user_fullfilment_request)

module.exports = router