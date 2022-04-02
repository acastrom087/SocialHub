const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode');

const User = require('../models/user');
const salt = 10;

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findUser(email)
        .then(async user => {
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign({ email }, 'secretKey');
                    res.cookie('token', token, { httpOnly: true, secure: false });
                    return res.status(200).json(user);
                }
            }

            res.status(401).json({
                message: "Invalid Credentials"
            });

        })
        .catch(err => {
            console.log(err);
        });
};

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
                    res.status(201).json({
                        message: 'User created'
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

exports.getUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        const { email } = decode(token);
        const user = await User.findUser(email);
        if (!user) {
            return res.status(404).send();
        }
        return res.status(200).json(user);
    }
    return res.status(403).send();
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

exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.end();
}