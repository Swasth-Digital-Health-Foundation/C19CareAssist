const { callHasura } = require('./util/hasura');

const persistService = async (service) => {
    const query = `
      mutation insert_o2_service($objects: [o2_service_insert_input!]!) {
        insert_o2_service(objects: $objects) {
          returning {
            uuid
          }
        }
      }
    `;
    const variable = {
      objects: service,
    };
    const response = await callHasura(query, variable, 'insert_o2_service');
    if (response.errors !== undefined)
     throw new ApiError(httpStatus.BAD_REQUEST, 'An active search already exists for this user.');
    //service.uuid = response.data.insert_o2_service.returning.uuid;
    return service;
  };



/**
 * On search
 * @param {Object} serviceBody
 * @returns {Promise<User>}
 */
 const registerService = async (serviceBody) => {
    const  services  = serviceBody.services;
    let serviceDbObjects = []
    for(var i in services){
      service = services[i]
      let serviceDbObject = {
          search_id: service.search_id,
          type: service.type,
          expires_at: service.expires_at,
          status: service.status,
      };
      serviceDbObjects.push(serviceDbObject)
    }
    serviceDbObjects = await persistService(serviceDbObjects);
  
  };  

  module.exports = {
    registerService,
  };