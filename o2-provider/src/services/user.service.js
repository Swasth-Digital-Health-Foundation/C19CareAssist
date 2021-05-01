const { encryptObject, hashObject } = require('./encryption.service');
const { callHasura } = require('./util/hasura');

const createUser = async (user) => {
  const objectToEncrypt = {
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    phone: user.phone,
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
  user.phone = encryptedValue.phone;

  user.mobile_hash = hashedValue.mobile;
  user.email_hash = hashedValue.email;
  user.phone_hash = hashedValue.phone;
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
  user.uuid = response.data.insert_o2_user_one.uuid;
  return user;
};

const getUserIdByMobile = async (mobile) => {
  const hashReq = {
    mobile,
  };
  const hashResponse = await hashObject(hashReq);
  const query = `
  query getO2user($mobile_hash: String!){
    o2_user(where: {mobile_hash: {_eq: $mobile_hash}}) {
      uuid
    }
  }   
`;
  const variable = {
    object: hashResponse.mobile,
  };
  const response = await callHasura(query, variable, 'o2_user');
  return response.data.o2_user;
};

const upsertUser = async (mobile) => {
  const hashReq = {
    mobile,
  };
  const hashResponse = await hashObject(hashReq);
  const query = `
  mutation upsert_o2_provider($object: o2_user_insert_input!) {
    insert_o2_user_one(object:$object, on_conflict: {constraint: o2_user_uniqueness , update_columns:[mobile_hash]}) {
      uuid
    }
  }
`;
  const variable = {
    object: {
      mobile,
      mobile_hash: hashResponse.mobile,
      type: 'consumer',
    },
  };
  const response = await callHasura(query, variable, 'upsert_o2_provider');
  return response.data.insert_o2_user_one;
};

module.exports = {
  createUser,
  getUserIdByMobile,
  upsertUser,
};
