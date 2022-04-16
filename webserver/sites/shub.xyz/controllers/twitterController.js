const passport = require('passport')
const auth = require('../authentication/auth.js');
const twitterClient = require('../authentication/twitterClient.js');


exports.twitterLogIn = (req, res, next) => {
    passport.authenticate('twitter');
}

exports.twitterAuth = async (req, res, next) => {
    const token = req.cookies.token;
    const user = await auth.authorize(token);
    const { twitterToken, twitterSecret } = twitterClient;

    passport.authenticate('twitter', { failureRedirect: '/dashboard' }),
        function (req, res) {


            return res.render('dashboard', {
                user: user
            })
        };
}