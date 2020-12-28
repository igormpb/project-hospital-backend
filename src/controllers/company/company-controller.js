const router = require('express').Router();

const createCompany = require('./create-company');
const getCompany = require('./get-company');
const getNameCompany = require('./get-name-company');



router.post('/create', (req,res)=> createCompany(req,res));
router.get('/all', (req,res)=> getCompany(req,res));
router.get('/name', (req,res)=> getNameCompany(req,res));




module.exports = router;