const csv = require('csvtojson');
const axios = require('axios');

// Fields name should be in the same order as they are in the sheet.
const FEILDS_TO_QUERY = [
  'title',
  'address',
  'comment',
  'last_verified_on',
  'pin_code',
  'hospital_available_icu_beds',
  'hospital_available_normal_beds',
  'hospital_available_oxygen_beds',
  'hospital_available_ventilator_beds',
];

// Headers name should not be duplicate
async function fetchBeds(pincode, options) {
  const data = await axios
    .get(`https://docs.google.com/spreadsheets/d/1QAIcPgNxnDtOT_fXf2p6bOEkcdU2EXv4hiOlztORJrI/gviz/tq?tqx=out:csv`)
    .then((res) => res.data)
    .catch(console.log);
  const filterData = await csv({
    noheader: false,
    includeColumns: new RegExp(`(${options.fields.join('|')})`),
    output: 'csv',
  })
    .on('header', (res) => console.log(res))
    .fromString(data)
    .then((csvRow) => {
      return csvRow.filter((item) => item[4].includes(pincode));
    });
  return filterData;
}

fetchBeds('110002', {
  fields: FEILDS_TO_QUERY,
}).then(console.log);
