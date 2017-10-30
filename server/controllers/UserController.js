exports.findUser = (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.send("You are not logged in!");
    }
};

exports.createUser = (req, res) => {

};

exports.login = (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/logged_in/failed/false/message/Successfully logged in!',
        failureRedirect: '/logged_in/failed/true/message/Invalid username or password!',
    });
};