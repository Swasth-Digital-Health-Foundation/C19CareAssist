
const { getQuery } = require('../service/util/api');
const { personService } = require('../service/service-loader');
const channelProvider = require('../../channel');
const envVariables = require('../../env-variables');
const { messages } = require('../messages/reminders');
const dialog = require('../util/dialog.js');
const sha256 = require('js-sha256');
const repoProvider = require('../../session/repo');

class AutoExitService {

    async main() {
      const people = await this.getSubscribedPeopleForProgramExit();
    
      this.exitProgram(people, message);


    }

    async getSubscribedPeopleForProgramExit() {
        const query = `query GetTriageDetails($isSubscribed: Boolean, $triageStartDate:timestamptz) {
          c19_triage(where: {created_at: {_lt: $triageStartDate}, subscribe: {_eq:  $isSubscribed}}) {
                person {
                  uuid
                  first_name
                  mobile
                }
              }
        }`

        const triageStartDate = new Date();
        triageStartDate.setDate(triageStartDate.getDate() - 14);

        const variables = {
            "isSubscribed": true,
            "triageStartDate": triageStartDate.toISOString()
          }
        const data = await getQuery(query, variables, null);

        const decrypedPeople = await this.decryptUserData(data.c19_triage);

        return decrypedPeople;
    }

    async decryptUserData(triageData) {
      let people = triageData.map(item => item.person);
      return await personService.decryptPersons(people);
    }

    exitProgram(people,  message) {
      people.forEach(person => {
        personService.exitProgram();
      })
    }

}

module.exports = new RemindersService();
