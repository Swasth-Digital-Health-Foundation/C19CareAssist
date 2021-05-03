const { Pool, Client } = require('pg')
//local postgres db connection
const dbConn = new Pool({
  host     : 'localhost',
  user     : 'postgres',
  password : '',
  database : 'covid'
});

module.exports = dbConn;