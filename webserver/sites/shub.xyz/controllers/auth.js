const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../authentication/auth');
const { authenticator } = require('otplib')
const TwitterApi = require('twitter-api-v2');
const requestClient = require('../authentication/twitter/client');

const User = require('../models/user');



exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findUser(email)
        .then(async user => {
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const jToken = jwt.sign({ email }, 'secretKey');
                    res.cookie('token', jToken, { httpOnly: true, secure: false });
                    if (user.hasAuth) {
                        return res.redirect('/login-authentication')
                    }
                    else {
                        return res.redirect('/dashboard');
                    }
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

exports.loginTFA = async (req, res, next) => {
    const token = req.cookies.token;
    const user = await auth.authorize(token);
    if (user) {
        return res.render('users/authenticator', {
            user: user,
            message: false
        })
    }
    return res.redirect('/login');

}

exports.authentication = async (req, res, next) => {
    const { token } = req.body;
    const user = await auth.authorize(req.cookies.token);
    const secret = user.secret;
    const tokenMatch = authenticator.verify({ token, secret });

    if (tokenMatch) {
        return res.redirect('/dashboard');
    }
    else {
        return res.render('users/authenticator', {
            user: user,
            message: true,
            error: 'Invalid Token'
        })
    }
};

exports.getDashboard = async (req, res, next) => {
    const token = req.cookies.token;
    const user = await auth.authorize(token);
    if (user) {
        return res.render('dashboard', {
            user: user
        })
    }
    return res.redirect('/login');
};

exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.redirect('/login');
}