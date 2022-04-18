
const QRCode = require('qrcode');
const auth = require('../authentication/auth.js');
const bcrypt = require('bcrypt');
const { authenticator } = require('otplib')

const User = require('../models/user.js');

const salt = 10;

exports.addUsers = (req, res, next) => {
    bcrypt.hash(req.body.password, salt, (err, encrypted) => {
        if (err) {
            return res.render('error', {
                error: err});
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
            const usrId = req.body.id;
            const name = req.body.name;
            const surname = req.body.surname;
            const email = req.body.email;
            const password = encrypted;
            const birthday = req.body.birthday;
            const gender = req.body.gender;
            const user = new User(name, surname, email, password, birthday, gender, usrId);
            user
                .save()
                .then(result => {
                    res.redirect(req.get('referer'));
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
    });
};

exports.enableTFA = async (req, res, next) => {
    const token = req.body.token;
    const user = await auth.authorize(req.cookies.token);
    const secret = user.secret;
    const tokenMatch = authenticator.verify({ token, secret });
    const regUser = new User(user.name, user.surname, user.email, user.password, user.birthday, user.gender, tokenMatch, user.id);

    if (regUser) {
        if (tokenMatch) {
            regUser.save()
                .then(result => {
                    res.redirect("/dashboard");
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
        else {
            return res.status(500).json({
                error: "Invalid token",
            })
        }
    }

}

exports.getSettings = async (req, res, next) => {
    const token = req.cookies.token;
    const user = await auth.authorize(token);

    QRCode.toDataURL(authenticator.keyuri(user.email, 'SocialHub', user.secret), function (err, url) {
        if (err) {
            return res.send("Error occured");
        }

        if (user) {
            return res.render('users/settings', {
                user: user,
                qr: url,
                message: false
            })
        }

        return res.redirect('/login');
    })
};


