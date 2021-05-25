const csv = require('csvtojson');
const axios = require('axios');
const moment = require('moment');

// Fields name should be in the same order as they are in the sheet.
const FEILDS_TO_QUERY = [
  'title',
  'phone_1',
  'address',
  'comment',
  'last_verified_on',
  'pin_code',
  'hospital_available_icu_beds',
  'hospital_available_normal_beds',
  'hospital_available_oxygen_beds',
  'hospital_available_ventilator_beds',
];

const filterData = async (data, pincode, options) => {
  const res = await csv({
    noheader: false,
    includeColumns: new RegExp(`(${options.fields.join('|')})`),
    output: 'csv',
  })
    .fromString(data)
    .then((csvRow) => {
      const map = {};
      csvRow
        .filter((item) => item[5].includes(pincode))
        .forEach((item) => {
          if (map[item[0]] && moment(map[item[0]]).isBefore(item[5])) {
            map[item[0]] = item;
          } else {
            map[item[0]] = item;
          }
        });
      return Object.values(map);
    });
  return res;
};

// Headers name should not be duplicate
async function fetchBeds(pincode, options) {
  const data = await axios
    .get(process.env.GOOGLE_SHEET_URL)
    .then((res) => res.data)
    .catch(console.log);

  const filteredData = await filterData(data, pincode, options);

  return filteredData;
}

//fetchBeds('110002', {
//  fields: FEILDS_TO_QUERY,
//}).then(console.log);
