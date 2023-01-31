const User = require('../models/user');

module.exports.renderRegister = async (req, res) => {
    res.render('users/register');
}

module.exports.registerForm = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerdUser = await User.register(user, password);
        req.login(registerdUser, err => {
            if (err) {
                return next(err);
            }
            else {
                req.flash('success', 'Welcome to Yelpcamp!');
                res.redirect('/campgrounds')
            }
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.loginForm = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logoutButton = (req, res) => {
    req.logout(
        function (err) {
            if (err) {
                req.flash('error', 'Some went Wrong');
            }
            else {
                req.flash('success', "Goodbye! Come back again");
                res.redirect('/login');
            }
        });

};