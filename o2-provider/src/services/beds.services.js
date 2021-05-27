const csv = require('csvtojson');
const axios = require('axios');
const moment = require('moment');
const https = require('https');
const fs = require('fs');
const path = require("path");

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
  const fields = options.sheetFields || FEILDS_TO_QUERY;
  const res = await csv({
    noheader: false,
    includeColumns: new RegExp(`(${fields.join('|')})`),
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
  
  let data;
  try {
    data = fs.readFileSync(path.resolve(__dirname, "../../resources/BedsAvailability.csv")).toString();
  } catch (e) {
    //Fallback to source file if error in fetching from local
    data = await axios
      .get(process.env.GOOGLE_SHEET_URL)
      .then((res) => res.data)
      .catch(console.log);
  }

  const filteredData = await filterData(data, pincode, options);

  return filteredData;
}


async function downloadSheet() {
  try {
    console.log('calling download sheets');
    const request = https.get(process.env.GOOGLE_SHEET_URL, (response) => {
      const fileDirectory = path.resolve(__dirname, "../../resources");
      if (!fs.existsSync(fileDirectory)){
          fs.mkdirSync(fileDirectory);
      }
      const file = fs.createWriteStream(`${fileDirectory}/BedsAvailability.csv`);
      response.pipe(file);
      console.log('sheets file created');
    });
  } catch(e) {
    console.log('error downloading sheets: ', e);
  }
}

module.exports = {
  fetchBeds,
  downloadSheet,
};

// downloadSheet();

// fetchBeds('110002', {
//  fields: FEILDS_TO_QUERY,
// }).then(console.log);
