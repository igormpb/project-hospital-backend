const login_user = require('./controllers/users/login-user');
const auth = require('./auth/auth');

const routes = require('express').Router();

routes.post('/api/v1/users/login',(req,res)=> login_user(req,res));
routes.use(auth)
routes.use('/api/v1/users', require('./controllers/users/user-controller'));
routes.use('/api/v1/supplies', require('./controllers/supplies/supplie-controller'));
routes.use('/api/v1/company', require('./controllers/company/company-controller'));
routes.use('/api/v1/report', require('./controllers/Report/report-controller'));




module.exports = routes;