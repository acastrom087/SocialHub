const decode = require('jwt-decode');


const User = require('../models/user.js');

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
    }
}