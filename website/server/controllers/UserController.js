let mongoose = require('mongoose'),
    User = mongoose.model("User"),
    Search = mongoose.model("Search"),
    error = require("../router/Error");

exports.findSearchHistory = (req, res) => {
    User.findOne({username: req.user.username}, (err, result) => {
        Search.find({_id: {$in: result.search_history}}, (err, searchHistory) => {
            if (err) error(res, err, 202);
            res.status(200).json(searchHistory);
        });
    });
};

exports.updateSearchHistory = (req, res) => {
    User.findOne({username: req.user.username}, (err, user) => {
        const search = new Search({search_string: req.params.search});
        user.search_history.push(search._id);
        search.save();
        user.save((err, result) => {
            if (err) error(res, err, 202);
            res.status(200).json(result);
        });
    });
};

exports.findUser = (req, res) => {
    res.json(req.user);
};

exports.createUser = (req, res, bcrypt) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (req.body.username.length < 3)
            error(res, "Your username needs to be atleast 3 characters long!", 202)
        else if (req.body.password === "")
            error(res, "You have not entered a password!", 202);
        else
        if (user)
            error(res, "This user already exists. Please try again with another username!", 202);
        else {
            const hashedPassword = bcrypt.hashSync(req.body.password),
                user = new User({username: req.body.username.toLowerCase(), password: hashedPassword});

            user.save((err, task) => {
                if (err) error(res, error, 202);
                res.json(task);
            });
        }
    });
};