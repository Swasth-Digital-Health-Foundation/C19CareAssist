const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const multipart = require("connect-multiparty")
const path = require('path')
const cors = require('cors')
const config = require("./Config/config");

app.use(cors())
/* Parsing the Data from client side (Json Format) */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/*This middleware will create temp files on your server and never clean them up. 
  Thus you should not add this middleware to all routes; only to the ones in which you want to accept uploads.
  And in these endpoints, be sure to delete all temp files, even the ones that you don't use. */
app.use(multipart());

/* Users Module Routing */
app.use((req, res, next) => { next() })
app.use(require('./routes/api'));
app.get('/', (req, res) => {
  res.send("Hello sathish")
})
app.listen(config.Port, () => {
  console.log(`Example app listening at http://localhost:${config.Port}`)
})
