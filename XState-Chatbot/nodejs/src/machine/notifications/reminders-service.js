
const { getQuery } = require('../util/api');
const { personService } = require('../service/service-loader');
const channelProvider = require('../../channel');
const { decryptPersons } = require('../service/swasth-person-service');
const envVariables = require('../../env-variables');
const { messages } = require('../messages/reminders');

class RemindersService {

    async triggerReminders(time) {
      const people = await this.getSubscribedPeople();
      this.sendMessages(people, time);
    }

    async getSubscribedPeople() {
      //TODO: Get only unique mobile numbers, using mobile_hash
        const query = `query GetSubscribedPeople($isSubscribed: Boolean) {
            c19_triage(where: {subscribe: {_eq: $isSubscribed}}) {
              person {
                uuid
                first_name
                mobile
              }
            }
          }
          `

        const variables = {
            "isSubscribed": true
          }
        const data = await getQuery(query, variables, null);

        const decrypedPeople = await this.decryptUserData(data.c19_triage);

        const peopleWithUniqueMobileNumbers = this.filterDuplicateMobileNumbers(decrypedPeople);

        return peopleWithUniqueMobileNumbers;
    }

    async decryptUserData(triageData) {
      let people = triageData.map(item => item.person);
      return await personService.decryptPersons(people);
    }

    filterDuplicateMobileNumbers(people) {
      const mobileNumbers = people.map(person => person.mobile)
      const peopleWithUniqueMobileNumbers = people.filter((person, index) => !mobileNumbers.includes(person.mobile, index + 1));
      return peopleWithUniqueMobileNumbers
    }

    sendMessages(people, time) {
        const extraInfo = {
          whatsAppBusinessNumber: envVariables.whatsAppBusinessNumber
        }

        const message = messages[time].en_IN;

        people.forEach(person => {
          channelProvider.sendMessageToUser(person,[message],extraInfo)
        });
    }
}

module.exports = new RemindersService();