
var db = require('../util/database.js');

class Post {
    constructor(message, media, schedule, status, user_id, id) {
        this.message = message;
        this.media = media;
        this.schedule = schedule;
        this.status = status;
        this.user_id = user_id;
        this.id = id;
    }

    static getPosts = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Posts', (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    };


    save = () => {
        return new Promise((resolve, reject) => {
            if (this.id > 0) {
                db.query('UPDATE Posts SET message = ?, media = ?, schedule = ?, status = ?, user_id = ? WHERE id = ?',
                    [this.message, this.media, this.schedule, this.status, this.user_id, this.id], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    });
            }
            else {
                db.query('INSERT INTO Posts (message, media, schedule, status, user_id) VALUES (?, ?, ?, ?, ?)',
                    [this.message, this.media, this.schedule, this.status, this.user_id], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results[0]);
                    });
            }

        });
    }

    static delete = (id, funcion) => {
        db.query("DELETE FROM Posts WHERE id = ?", [id], funcion);

    }

    static findPosts = (user_id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Posts WHERE user_id = ?', [user_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    };

    static findPostById = (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Posts WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            });
        });
    };


    static getLastPost = (id, funcion) => {
        db.query("SELECT id, date_format(date, '%d') as 'day', date_format(date, '%c') as 'month', date_format(date, '%Y') as 'year', date_format(date, '%H') as 'hour',date_format(date, '%i') as 'minute'  FROM socialhub.posts WHERE id=?", [id], funcion)
    }
}

module.exports = Post;