const express = require('express');
const { downloadSheet } = require('../../services/beds.services');

const bedsRoute = express.Router();
bedsRoute
  .route('/download-sheet')
  .post((req, res) => {
    console.log('triggered download sheet');
    downloadSheet();
  });

module.exports = {
  bedsRoute,
};
