const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'anthony',
    password: '0121',
    database: 'socialHub'
})


connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
})

module.exports = connection;