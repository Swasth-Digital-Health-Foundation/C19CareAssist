const html = `
<!DOCTYPE html>
<html>

<head>
    <mate charest="utf-8" />
    <title>{{this.person.first_name}}'s Report</title>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #dddddd4d;
    }
    </style>
</head>

<body>
    <ul>
        <li>Patient's Name: {{this.person.first_name}}</li>
        <li>Age: {{this.person.age}}</li>
        <li>Gender: 
        <span style="text-transform: capitalize">{{this.person.gender}}</span>
        </li>
        <li>Enrollment Date: {{this.c19_triage.created_date}}</li>
        <li>Symptoms: {{this.c19_triage.symptoms}}</li>
        <li>RT PCR result: {{this.c19_triage.rt_pcr_status}}</li>
        <li>Comorbidities: {{this.c19_triage.comorbidities}}</li>
    </ul>
    <div>
        <table>
            <tr>
              <th>Date</th>
              <th>Time of recording</th>
              <th>SpO2</th>
              <th>Temperature</th>
            </tr>
            {{#each this.c19_vitals}}
            <tr>
                <td>{{this.created_date}}</td>
                <td>{{this.created_time}}</td>
                <td style="text-transform: capitalize">{{this.spo2}}</td>
                <td style="text-transform: capitalize">{{this.temperature}}</td>
            </tr>
            {{/each}}
        </table>
    </div>
</body>

</html>
`

module.exports = html;
