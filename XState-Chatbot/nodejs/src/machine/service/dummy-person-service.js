const dialog = require('../util/dialog.js');
const roles = require('../../../resources/roles.json');

class PersonService {
  async createPerson(person, mobileNumber) {
    console.log('Create person: ' + JSON.stringify(person));
    let uuid = '123'; // Person id returned from backend service
    person.uuid = uuid;
    return person;
  }

  async getPersonsForMobileNumber(mobileNumber) {
    return [
      {
        uuid: '366cb14e',
        gender: '',
        age: null,
        first_name: 'Kumar Singh',
        mobile: '9344290493',
        mobile_code: '91',
      },
      {
        uuid: '9f9896c6',
        gender: 'female',
        age: 12,
        first_name: 'Jyoti Kumar',
        mobile: '9344290493',
        mobile_code: '91',
      },
      {
        uuid: '366cb14e',
        gender: '',
        age: null,
        first_name: 'Kumar Singh',
        mobile: '9901499745',
        mobile_code: '91',
      },
      {
        uuid: '9f9896c6',
        gender: 'female',
        age: 12,
        first_name: 'Jyoti Kumar',
        mobile: '9901499745',
        mobile_code: '91',
      },
      {
        uuid: '366cb14e',
        gender: '',
        age: null,
        first_name: 'Kumar Singh',
        mobile: '9123123123',
        mobile_code: '91',
      },
      {
        uuid: '9f9896c6',
        gender: 'female',
        age: 12,
        first_name: 'Jyoti Kumar',
        mobile: '9123123123',
        mobile_code: '91',
      },
    ].filter((user) => user.mobile === mobileNumber);
  }

  async getSubscribedPeople(mobileNumber) {
    return await this.getPersonsForMobileNumber(mobileNumber);
  }

  async getPeople(mobileNumber) {
    return await this.getPersonsForMobileNumber(mobileNumber);
  }

  async validateName(context, event) {
    let message = dialog.get_input(event, false);
    if (event.message.type == 'text' && message.length < 100 && /^[ A-Za-z]+$/.test(message.trim())) {
      const subscribedPeople = this.filterSubscribedPeople(context.persons);
      const isDuplicate = subscribedPeople.find((person) => person.first_name == message);
      if (isDuplicate) {
        return 'duplicate';
      } else {
        return message;
      }
    } else {
      return 'invalid';
    }
  }

  filterSubscribedPeople(people) {
    const subscribedPeople = [];
    for (let i = 0; i < people.length; i++) {
      if (people[i].c19_triage && people[i].c19_triage.subscribe) {
        subscribedPeople.push(people[i]);
      }
    }
    return subscribedPeople;
  }

  getUserType(mobileNumber) {
    if (roles[mobileNumber]) {
      return roles[mobileNumber].roles;
    }
    return 'citizen';
  }
}

module.exports = new PersonService();
