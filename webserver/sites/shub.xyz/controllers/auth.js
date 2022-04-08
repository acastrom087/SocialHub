const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../authentication/auth');

const User = require('../models/user');



exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findUser(email)
        .then(async user => {
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const jToken = jwt.sign({ email }, 'secretKey');
                    if (user.token) {
                        console.log(true);
                    }
                    else {
                        res.cookie('token', jToken, { httpOnly: true, secure: false });
                        res.redirect('/dashboard');
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