let mongoose = require('mongoose'),
    User = mongoose.model("User"),
    Search = mongoose.model("Search"),
    error = require("../router/Error");

exports.findSearchHistory = (req, res) => {
    User.findOne({username: req.user.username}, (err, result) => {
        Search.find({_id: {$in: result.search_history}}, (err, searchHistory) => {
            if (err) error(res, err, 500);
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
            if (err) error(res, err, 500);
            res.status(200).json(result);
        });
    });
};

exports.findUser = (req, res) => {
    res.json(req.user);
};

exports.createUser = (req, res, bcrypt) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (user)
            error(res, "This user already exists!", 500);
        else {
            const hashedPassword = bcrypt.hashSync(req.body.password),
                user = new User({username: req.body.username, password: hashedPassword});

            user.save((err, task) => {
                if (err) error(res, error, 500);
                res.json(task);
            });
        }
    });
};