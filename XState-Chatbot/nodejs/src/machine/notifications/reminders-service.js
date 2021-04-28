
// const { personService } = require('./service/service-loader');
const { getQuery } = require('../util/api');
const { personService } = require('../service/service-loader');

class RemindersService {

    async getSubscribedPeople() {
        const query = `query GetSubscribedPeople($isSubscribed: Boolean) {
            c19_triage(where: {subscribe: {_eq: $isSubscribed}}) {
              person {
                uuid
                first_name
                mobile
                mobile_code
                mobile_hash
              }
            }
          }
          `

        const variables = {
            "isSubscribed": true
          }
        const data = await getQuery(query, variables, null);
        this.decryptUserData(data.c19_triage)
        console.log('data is: ', data);
    }

    async decryptUserData(triageData) {
      let persons = triageData.map(item => item.person);
      const decrypedPersons = await personService.decryptPersons(persons);
      console.log('decrpypted persons are: ', decrypedPersons);
    }

    sendMessages() {
        //sendMessageToUser from kaleyra
    }
}

module.exports = new RemindersService();