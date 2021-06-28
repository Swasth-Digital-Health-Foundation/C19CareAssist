const express = require('express'),
    router = express.Router(),
    config = require('../env-variables');

router.post('/patient/add', async (req, res) =>  {

});

router.post('/patient/search', async (req, res) =>  {

});

router.post('/vital/add', async (req, res) =>  {

});

router.post('/vital/update', async (req, res) =>  {

});

router.post('/trigger/vital', async (req, res) => {

});

router.post('/trigger/vital', async (req, res) => {

});

router.get('/health', (req, res) => res.sendStatus(200));

module.exports = router;
