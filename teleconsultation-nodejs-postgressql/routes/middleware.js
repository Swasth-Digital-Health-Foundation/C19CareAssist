const UserMiddleware = (req, res, next) => {
    //var token = req.headers['authorization'];
    req.body.token = "covid-19";
    next()
}

module.exports = {
    UserMiddleware: UserMiddleware
}