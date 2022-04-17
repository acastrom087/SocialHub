const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../authentication/auth.js');
const { authenticator } = require('otplib')
const twitterClient = require('../authentication/twitterClient.js');

const User = require('../models/user.js');
const TwitterApi = require('twitter-api-v2').TwitterApi;

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
    const user = await auth.authorize(req.cookies.token);
    const secretToken = auth.twitterAuthorize(req.cookies.twitterToken);
    const { oauth_token, oauth_verifier } = req.query;

    if (oauth_token && oauth_verifier) {

        const tempClient = twitterClient.tempClient(oauth_token, secretToken);

        try {
            const { accessToken, accessSecret } = await tempClient.login(oauth_verifier);
            const twitterKeys = jwt.sign({ accessToken, accessSecret }, 'twitterAcc');

            res.cookie('twitterAuth', twitterKeys, { httpOnly: true, secure: false });
            
            return res.redirect(callBackURL);
        } catch (error) {
            console.log(error);
            return res.redirect(callBackURL);
        }

        /*tempClient.login(oauth_verifier)
            .then(({ client: loggedClient, accessToken, accessSecret }) => {
                const accToken = accessToken
                const accSecret = accessSecret
                const twitterKeys = jwt.sign({ accToken, accSecret }, 'twitterAcc');
                res.cookie('twitterAuth', twitterKeys, { httpOnly: true, secure: false });
                return res.redirect(callBackURL);
            })
            .catch((error) => {
                //return res.send('Invalid verifier or access tokens!')
                console.log(error);
            });*/
    }

    const authLink = await twitterClient.client.generateAuthLink(callBackURL);

    if (authLink) {
        const authT = authLink.oauth_token_secret
        const twitterJWT = jwt.sign({ authT }, 'twitterKey');
        res.cookie('twitterToken', twitterJWT, { httpOnly: true, secure: false });
    }

    if (user) {      
        if (req.cookies.twitterAuth) {
            return res.render('dashboard', {
                user: user,
                authLink: authLink.url,
                twitterAuth: true
            })
        }
        else {
            return res.render('dashboard', {
                user: user,
                authLink: authLink.url,
                twitterAuth: false
            })
        }
    }
    return res.redirect('/login');
};

exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.clearCookie("twitterToken");
    res.clearCookie("twitterAuth");
    res.redirect('/login');
}

exports.twitterLogout = (req, res, next) => {
    res.clearCookie("twitterAuth");
    res.redirect('/dashboard');
}
