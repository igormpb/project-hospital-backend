const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const auth = require('./auth/auth');
require('dotenv-safe').config();

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);


const PORT = process.env.PORT || 3003;
app.listen(PORT,() => console.log(`http://localhost:${PORT}`));