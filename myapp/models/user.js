var conexion = require('../database/conexion');

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static get(){

        conexion.query("SELECT * FROM users")


    }
}

module.exports = User;