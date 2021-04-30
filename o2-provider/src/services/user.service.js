const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const { encryptObject } = require('./encryption.service');

const createUser = async (user) => {

  encryptUser(user);

};

const encryptUser = async (user) => {
  encryptObject(user);
  return user;
}

module.exports = {
  createUser
};
