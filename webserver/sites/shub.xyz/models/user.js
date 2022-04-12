
const mysql = require('../util/database')
const con = require('../util/database');
const db = require('../util/database')

class User {
    constructor(name, surname, email, password, birthday, gender, base32, pathURL, isAdmin, hasAuth, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.gender = gender;
        this.isAdmin = isAdmin;
        this.secret_base32 = base32;
        this.secret_path_url = pathURL;
        this.hasAuth = hasAuth;
        this._id = id;
    }

    save = () => {
        return new Promise((resolve, reject) => {
            if (this._id) {
                db.query('UPDATE Users SET name = ?, surname = ?, email = ?, password = ?, birthday = ?, gender = ?, isAdmin = ?, secret_base32 = ?, secret_path_url = ?, hasAuth = ? WHERE id = ?',
                    [this.name, this.surname, this.email, this.password, this.birthday, this.gender, this.isAdmin,
                    this.secret_base32, this.secret_path_url, this.hasAuth, this._id], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    });
            }
            else {
                db.query('INSERT INTO Users (name, surname, email, password, birthday, gender, secret_base32, secret_path_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [this.name, this.surname, this.email, this.password, this.birthday, this.gender, this.secret_base32, this.secret_path_url], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    });
            }

        });
    }

    static setToken = (response) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE Users SET hasAuth = ? WHERE id = ?',
                [response, this._id], (err, results) => {
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