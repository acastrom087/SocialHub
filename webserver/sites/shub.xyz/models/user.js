
const db = require('../util/database');
const { authenticator } = require('otplib')
const secret = authenticator.generateSecret()

class User {
    constructor(name, surname, email, password, birthday, gender, hasAuth=false, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
        this.hasAuth = hasAuth;
        this.id = id;
    }

    save = () => {
        return new Promise((resolve, reject) => {
            if (this.id > 0) {
                db.query('UPDATE Users SET name = ?, surname = ?, email = ?, password = ?, birthday = ?, gender = ?, hasAuth = ? WHERE id = ?',
                    [this.name, this.surname, this.email, this.password, this.birthday, this.gender, this.hasAuth, this.id], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    });
            }
            else {
                db.query('INSERT INTO Users (name, surname, email, password, birthday, gender, secret) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [this.name, this.surname, this.email, this.password, this.birthday, this.gender, secret], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    });
            }

        });
    }

    static updateToken = (value, id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Users SET hasAuth = ? WHERE id = ?',
                [value, id], (err, results) => {
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