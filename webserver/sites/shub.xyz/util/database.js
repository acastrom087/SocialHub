const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '192.168.56.30',
    user: 'admin',
    password: 'secret',
    database: 'socialHub'
    /*host: 'localhost',
    user: 'root',
    password: '0121',
    database: 'socialHub'*/
})


connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
})

module.exports = connection;