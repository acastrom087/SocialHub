const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../authentication/auth.js');
const { authenticator } = require('otplib')
const twitterClient = require('../authentication/twitterClient.js');

const User = require('../models/user.js');

const callBackURL = "http://shub811.xyz:3000/dashboard/";


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
    const authLink = await twitterClient.client.generateAuthLink(callBackURL);
    const twitterAuth = false;
    const linkedInAuth = false;

    if (req.query.oauth_token || req.query.oauth_verifier) {
        const twitterToken = toString(req.query.oauth_token);
        const verifier = toString(req.query.oauth_verifier);
        const tempClient = twitterClient.tempClient(twitterToken, authLink.oauth_token_secret);

        if (verifier !== '' && twitterToken !== '') {
            const { accessToken, accessSecret, screenName, userId } = await tempClient.login(verifier);

            if (accessToken && accessSecret) {
                twitterAuth = true;
                console.log('Twitter account verified');
            }
        }
    }

    if (user) {
        return res.render('dashboard', {
            user: user,
            authLink: authLink.url,
            twitterAuth: twitterAuth,
            linkedInAuth: linkedInAuth
        })
    }
    return res.redirect('/login');
};

exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.redirect('/login');
}

