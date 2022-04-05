exports.getHome = (req, res, next) => {
    res.render('index');
}

exports.getLogin = (req, res, next) => {
    res.render('login');
}

exports.getRegister = (req, res, next) => {
    res.render('register');
}