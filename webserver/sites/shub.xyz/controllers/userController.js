const User = require('../models/user');

exports.addUsers = (req, res, next) => {
    bcrypt.hash(req.body.password, salt, (err, encrypted) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const name = req.body.name;
            const surname = req.body.surname;
            const email = req.body.email;
            const password = encrypted;
            const birthday = req.body.birthday;
            const gender = req.body.gender;
            const user = new User(name, surname, email, password, birthday, gender);
            user
                .save()
                .then(result => {
                    res.redirect('/login');
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
    });

};

exports.updateUser = (req, res, next) => {
    bcrypt.hash(req.body.password, salt, (err, encrypted) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            const usrId = req.body._id;
            const name = req.body.name;
            const surname = req.body.surname;
            const email = req.body.email;
            const password = encrypted;
            const birthday = req.body.birthday;
            const gender = req.body.gender;
            const user = new User(name, surname, email, password, birthday, gender, new ObjectId(usrId));
            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: 'User updated'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
    });
};

