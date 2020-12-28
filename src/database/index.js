const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'project'

    }
);

connection.connect(err => {
    if (err) return console.log(err);
    console.log('connectou!');
});

module.exports = connection;