const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const { encryptObject } = require('./encryption.service');
const { callHasura } = require('./util/hasura');

const createUser = async (user) => {
  let objectToEncrypt = {
    name: user.name,
    mobile: user.mobile,
    email: user.email
  };
  let encryptedObject = await encryptUser(objectToEncrypt);

  user = { ...user, ...encryptedObject };

  user = persistUser(user);

  return user;
};

const encryptUser = async (user) => {
  let { encryptedValue, hashedValue } = await encryptObject(user);
  user.name = encryptedValue.name;
  user.mobile = encryptedValue.mobile;
  user.email = encryptedValue.email;

  user.mobile_hash = hashedValue.mobile;
  user.email_hash = hashedValue.email;
  return user;
};

const persistUser = async (user) => {
  let query = `
    mutation insert_o2_user($object: o2_user_insert_input!) {
      insert_o2_user_one(object: $object) {
        uuid
      }
    }  
  `;
  let variable = {
    object: user
  };
  user.uuid = callHasura(query, variable, 'insert_o2_user').insert_o2_user_one.uuid;
  return user;
};

module.exports = {
  createUser
};
