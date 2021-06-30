const fetch = require("node-fetch");
const config = require('../env-variables');
// const dialog = require('../util/dialog.js');

class PersonService {
  async createPerson(person) {
    if (person)
      let encryptedPerson = await this.encryptAndHashPerson(person);
    var query = `
    mutation insert_person($object: person_insert_input!) {
      insert_person_one(object: $object) {
        uuid
      }
    }    
    `;
    var options = {
      method: "POST",
      body: JSON.stringify({
        query: query,
        variables: {
          object: {
            first_name: encryptedPerson.first_name,
            patient_id: person.patient_id,
            age: person.age,
            gender: person.gender,
            mobile: encryptedPerson.mobile,
            mobile_hash: encryptedPerson.mobile_hash,
            mobile_code: "91",
            comorbidity: person.comorbidity,
            status: person.status,
          },
        },
        operationName: "insert_person",
      }),
      headers: {
        "x-hasura-admin-secret": config.hasuraAdminSecret,
      },
    };
    let response = await fetch(config.hasuraUrl, options);
    let data = await response.json();
    person.uuid = data.data.insert_person_one.uuid;
    return person;
  }

  async getPersons(queryData) {
    let hashedMobile = await this.getHash(queryData.mobile);
    let patient_id = queryData.patient_id || "";
    var query = `
    query get_people($patient_id: String!, $mobile_hash: String!) {
      person(where: {_or:[ {patient_id: {_eq: $patient_id}}, {mobile_hash: {_eq: $mobile_hash}}]}) {
        uuid
        gender
        age
        mobile
        mobile_hash
        mobile_code      
      }
    }    
    `;
    var options = {
      method: "POST",
      body: JSON.stringify({
        query: query,
        variables: {
          patient_id: patient_id,
          mobile_hash: hashedMobile || ""
        },
        operationName: "get_people",
      }),
      headers: {
        "x-hasura-admin-secret": config.hasuraAdminSecret,
      },
    };

    let response = await fetch(config.hasuraUrl, options);

    let data = await response.json();
    let persons = data.data.person;
    persons = await this.decryptPersons(persons);

    return persons;
  }

  async getSubscribedPeople(mobileNumber) {
    let people = await this.getPersonsForMobileNumber(mobileNumber);
    const subscribedPeople = this.filterSubscribedPeople(people);
    return subscribedPeople;
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

  async getPeople(query) {
    let people = await this.getPersons(query);
    return people;
  }

  async encryptAndHashPerson(person) {
    let objectToEncrypt = {
      mobile: person.mobile,
      first_name: "test001",
    };
    let url =
      config.services.encryptionServiceHost +
      config.services.encryptionServiceEncryptUrl;
    let headers = {
      "Content-Type": "application/json",
    };
    let options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        encryptionRequests: [
          {
            tenantId: config.rootTenantId,
            type: "Normal",
            value: objectToEncrypt,
          },
        ],
      }),
    };

    let encryptedPerson = JSON.parse(JSON.stringify(person));

    let response = await fetch(url, options);
    let body = await response.json();
    encryptedPerson.mobile = body[0].encrypted.mobile;
    encryptedPerson.mobile_hash = body[0].hashed.mobile;

    return encryptedPerson;
  }

  async decryptPersons(persons) {
    let objectToDecrypt = persons.map((person) => {
      return { mobile: person.mobile };
    });

    let url =
      config.services.encryptionServiceHost +
      config.services.encryptionServiceDecryptUrl;
    let headers = {
      "Content-Type": "application/json",
    };
    let options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(objectToDecrypt),
    };
    let response = await fetch(url, options);
    let body = await response.json();

    for (let i = 0; i < persons.length; i++) {
      //persons[i].first_name = body[i].first_name;
      persons[i].mobile = body[i].mobile;
    }

    return persons;
  }

  async getHash(value) {
    let url =
      config.services.encryptionServiceHost +
      config.services.encryptionServiceHashUrl;
    let headers = {
      "Content-Type": "application/json",
    };
    let options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        value: value,
      }),
    };
    let response = await fetch(url, options);
    let body = await response.json();

    return body.value;
  }

  async validateName(context, event) {
    let message = dialog.get_input(event, false);
    if (
      event.message.type == "text" &&
      message.length < 100 &&
      /^[ A-Za-z]+$/.test(message.trim())
    ) {
      const subscribedPeople = this.filterSubscribedPeople(context.persons);
      const isDuplicate = subscribedPeople.find(
        (person) => person.first_name == message
      );
      if (isDuplicate) {
        return "duplicate";
      } else {
        return message;
      }
    } else {
      return "invalid";
    }
  }
}

module.exports = new PersonService();