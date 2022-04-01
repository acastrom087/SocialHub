var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'anthony',
    password: '0121',
    database: 'socialhub'
}
);

con.connect(
    (err)=>{
        if(!err){
            console.log('Conexion establecida');
        }else{
            console.log('Error de conexion', err);
        }
    }
)

module.exports =con;