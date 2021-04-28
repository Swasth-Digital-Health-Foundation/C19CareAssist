const pdfCreator = require('pdf-creator-node');
const fs = require('fs');
const path = require("path");

class TriageService {

    async upsertTriageDetails(person, triage) {
        // Nothing to return 
        console.log('Upsert Triage');
        console.log(JSON.stringify(triage));
    }

    async getUserData(person) {
        const userData = {
            "uuid": "9f9896c6-1e9f-4d8b-ac5a-0163670f0bf8",
            "age": 12,
            "first_name": "ads",
            "gender": "female",
            "mobile": "9123123123",
            "mobile_hash": null,
            "c19_triage": {
                "created_at": "2021-04-23T17:04:16.978548+00:00",
                "comorbidities": "true",
                "rt_pcr_status": null,
                "symptoms": null
            },
            "c19_vitals": [
                {
                "created_at": "2021-04-23T17:28:16.359211+00:00",
                "spo2": "good",
                "temperature": "bad"
                },
                {
                "created_at": "2021-04-27T15:01:21.462757+00:00",
                "spo2": "bad",
                "temperature": "good"
                }
            ]
        }
        return userData;
    }

    async downloadReportForPerson(person) {
        const html = fs.readFileSync(path.resolve(__dirname, "../../../resources/pdf-template-download-report.html")).toString()

        const options = {
                format: "A3",
                orientation: "portrait",
                border: "10mm",
                header: {
                    height: "45mm",
                    contents: '<div style="text-align: center;">Swasth Chatbot Report</div>'
                }
            };

        const userData = await this.getUserData(person);

        const c19_vitals = JSON.parse(JSON.stringify(userData.c19_vitals));
        c19_vitals.forEach(vital => {
            vital.created_date = new Date('2021-04-23T17:04:16.978548+00:00').toDateString();
            vital.created_time = new Date('2021-04-23T17:04:16.978548+00:00').toLocaleTimeString()
        });
            
        const variables = {
                person: {
                    first_name: userData.first_name,
                    mobile: userData.mobile,
                    gender: userData.gender,
                    age: userData.age
                },
                c19_triage: {...userData.c19_triage, 'created_date': new Date('2021-04-23T17:04:16.978548+00:00').toDateString()},
                c19_vitals: c19_vitals
        };
              
        const document = {
                html: html,
                data: variables,
                path: `pdf-output/pdf-${person.uuid}-${new Date().getTime()}.pdf`,
                type: "",
              };
        
        pdfCreator.create(document, options)
                .then((res) => {
                        console.log(res);
                    })
                .catch((error) => {
                        console.error(error);
                    });
    }

    async exitProgram(person, exitSlots) {

    }

}

module.exports = new TriageService();