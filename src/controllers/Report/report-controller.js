const getExitReport = require('./get-exit-report');
const getEntryReport = require('./get-entry-report');
const SearchEntryReport = require('./search-entry-report');
const searchExitReport = require('./search-exit-report');
const searchCompany = require('./search-company');
const router = require('express').Router();

router.get('/exit', (req,res) => getExitReport(req,res));
router.get('/entry', (req,res) => getEntryReport(req,res));
router.post('/entry-search', (req,res) => SearchEntryReport(req,res));
router.post('/exit-search', (req,res) => searchExitReport(req,res));
router.post('/destiny-search', (req,res) => searchCompany(req,res));




module.exports = router;