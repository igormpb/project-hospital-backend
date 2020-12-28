const router = require('express').Router();

const list_all = require('./list-user');
const login_user = require('./login-user');
const create_user = require('./create-user');
const delete_user = require('./delete-user');
const password_change = require('./password-change');
const change_role = require('./change-role-user');
const auth = require('../../auth/auth');






router.get('/all', (req,res) => list_all(req,res));

router.post('/create',(req,res)=> create_user(req,res));

router.delete('/delete/:uuid', (req,res) => delete_user(req,res));

router.patch('/password-change/:uuid',(req,res) => password_change(req,res));

router.patch('/change-role/:uuid',(req,res)=>change_role(req,res));

module.exports = router;