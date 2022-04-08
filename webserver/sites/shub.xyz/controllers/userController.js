const QRCode = require('qrcode');
const speaky = require('speakeasy');
const auth = require('../authentication/auth');

const User = require('../models/user');

const salt = 10;
let secret = speaky.generateSecret({
    name: 'SocialHub'
})


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
    const jtoken = req.cookies.token;
    const user = await auth.authorize(jtoken);

    if (user) {
        if (auth.verified(secret.ascii, token)) {
            console.log("verified");
            user.setToken(token)
                .then(result => {
                    console.log(result);
                    res.redirect("/dashboard");
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
    }

}

exports.getSettings = async (req, res, next) => {
    const token = req.cookies.token;
    const user = await auth.authorize(token);
    let code = "";

    QRCode.toDataURL(secret.otpauth_url, function (err, url) {
        code = url
    });

    if (user) {
        return res.render('users/settings', {
            user: user,
            QRCode: code
        })
    }

    return res.redirect('/login');
};

