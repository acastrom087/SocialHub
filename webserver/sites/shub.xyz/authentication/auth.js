const decode = require('jwt-decode');
const speaky = require('speakeasy');

const User = require('../models/user');

module.exports = {

    authorize(token) {
        if (token) {
            const { email } = decode(token);
            const user = User.findUser(email);
            if (!user) {
                return res.redirect('/login');
            }
            return user;
        }
    },

    verified(key, token) {
        return speaky.totp.verify({
            secret: key,
            encoding: 'ascii',
            token: token
        })
    }
}