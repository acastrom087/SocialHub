//<<<<<<< HEAD
var mysql = require('../util/database')
var con = require('../util/database');
//=======
var db = require('../util/database')

//>>>>>>> da5420c0a6562a8cbf29e6f0fd7f692dd6c9df9c
class User {
    constructor(name, surname, email, password, birthday, gender, token, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
        this.token = token;
        this._id = id;
    }

    save = () => {
        return new Promise((resolve, reject) => {
            if (this._id) {
                db.query('UPDATE Users SET name = ?, surname = ?, email = ?, password = ?, birthday = ?, gender = ? WHERE id = ?',
                    [this.name, this.surname, this.email, this.password, this.birthday, this.gender, this._id], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    });
            }
            else {
                db.query('INSERT INTO Users (name, surname, email, password, birthday, gender) VALUES (?, ?, ?, ?, ?, ?)',
                    [this.name, this.surname, this.email, this.password, this.birthday, this.gender], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    });
            }

        });
    }

    setToken = (token) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Users SET token = ? WHERE id = ?',
            [token, this._id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            });
        });
    }

    static findUser = (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            });
        });
    };
};

module.exports = User;