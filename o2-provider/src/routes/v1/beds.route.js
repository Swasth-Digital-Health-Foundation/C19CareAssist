const express = require('express');
const httpStatus = require('http-status');
const { downloadSheet } = require('../../services/beds.services');

const bedsRoute = express.Router();
bedsRoute.route('/download-sheet').post((req, res) => {
  console.log('triggered download sheet');
  downloadSheet().then(() => res.status(httpStatus.OK).send(''));
});

module.exports = {
  bedsRoute,
};
