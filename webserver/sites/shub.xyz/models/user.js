var mysql = require('../util/database')

class User {
    constructor(name, surname, email, password, birthday, gender, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
        this._id = id;
    }

    save() {
        
    }

    static findUser(email) {

    }
};

module.exports = User;