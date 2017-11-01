let mongoose = require('mongoose'),
    User = mongoose.model("User"),
    Search = mongoose.model("Search");

exports.findSearchHistory = (req, res) => {
    User.findOne({username: req.user.username}, (err, result) => {
        Search.find({_id: {$in: result.search_history}}, (err, result) => {
            console.log(result);
            res.status(200).json(result);
        });
    });
};

exports.updateSearchHistory = (req, res) => {
    User.findOne({username: req.user.username}, (err, result) => {
        const search = new Search({search_string: req.params.search});
        result.search_history.push(search._id);
        search.save();
        result.save((err, result) => {
            if (err) res.status(500).json({error: "Failed to add search!"});
            res.status(200).json(result);
        });
    });
};

exports.findUser = (req, res) => {
    res.json(req.user);
};

exports.createUser = (req, res, bcrypt) => {
    const hashedPassword = bcrypt.hashSync(req.body.password),
        user = new User({username: req.body.username, password: hashedPassword});

    user.save((err, task) => {
        if (err) res.send(err);
        res.json(task);
    });
};