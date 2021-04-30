const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const { encryptObject } = require('./encryption.service');
const { callHasura } = require('./util/hasura');

const createUser = async (user) => {
  const objectToEncrypt = {
    name: user.name,
    mobile: user.mobile,
    email: user.email,
  };
  const encryptedObject = await encryptUser(objectToEncrypt);

  user = { ...user, ...encryptedObject };

  user = await persistUser(user);

  return user;
};

const encryptUser = async (user) => {
  const { encryptedValue, hashedValue } = await encryptObject(user);
  user.name = encryptedValue.name;
  user.mobile = encryptedValue.mobile;
  user.email = encryptedValue.email;

  user.mobile_hash = hashedValue.mobile;
  user.email_hash = hashedValue.email;
  return user;
};

const persistUser = async (user) => {
  const query = `
    mutation insert_o2_user($object: o2_user_insert_input!) {
      insert_o2_user_one(object: $object) {
        uuid
      }
    }  
  `;
  const variable = {
    object: user,
  };
  const response = await callHasura(query, variable, 'insert_o2_user');
  user.uuid = response.insert_o2_user_one.uuid;
  return user;
};

module.exports = {
  createUser,
};
