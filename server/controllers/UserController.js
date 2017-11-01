let mongoose = require('mongoose'),
    User = mongoose.model("User");

exports.findUser = (req, res) => {
    res.json(req.user);
};

exports.createUser = (req, res, bcrypt) => {
    let hashedPassword = bcrypt.hashSync(req.body.password),
        user = new User({username: req.body.username, password: hashedPassword});

    user.save((err, task) => {
        if (err) res.send(err);
        res.json(task);
    });
};