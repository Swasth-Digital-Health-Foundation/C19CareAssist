
const { getQuery } = require('../service/util/api');
const { personService } = require('../service/service-loader');
const channelProvider = require('../../channel');
const envVariables = require('../../env-variables');
const { messages } = require('../messages/reminders');
const dialog = require('../util/dialog.js');

class RemindersService {

    async triggerReminders(time=null) {
      console.log('time is: ', time);
      const people = await this.getSubscribedPeople();

      if (!time) {
        time = this.getTime();
      }

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

        const message = dialog.get_message(messages[time]);

        people.forEach(person => {
          person.mobileNumber = person.mobile;
          channelProvider.sendMessageToUser(person,[message],extraInfo)
        });
    }

    getTime() {
     const hour = new Date().getHours();
     switch(hour) {
       case hour >= 9 || hour <= 11:
         return 'morning';
       case hour >= 14 || hour <= 16:
         return 'afternoon'; 
       case hour >= 20 || hour <= 22:
          return 'evening'; 
       default:
          return 'default';
     }
    }
}

module.exports = new RemindersService();