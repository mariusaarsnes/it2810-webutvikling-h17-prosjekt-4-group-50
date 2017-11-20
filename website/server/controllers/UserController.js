let mongoose = require('mongoose'),
    User = mongoose.model("User"),
    Artist = mongoose.model("Artist"),
    History = mongoose.model("History"),
    error = require("../router/Error");

exports.findSearchHistory = (req, res) => {
    User.findOne({username: req.user.username}, (err, result) => {
        History.find({_id: {$in: result.search_history}}, (err, searchHistory) => {
            if (err) error(res, err, 202);
            res.status(200).json(searchHistory);
        });
    });
};

exports.updateSearchHistory = (req, res) => {
    User.findOne({username: req.user.username}, (err, user) => {
        const history = new History({type: req.body.type, type_id: req.body.id});
        user.search_history.push(history._id);
        history.save();
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
            error(res, "Your username needs to be atleast 3 characters long!", 202);
        else if (req.body.password === "")
            error(res, "You have not entered a password!", 202);
        else if (user)
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

exports.findAggregateGenres = (req, res) => {
    User.findOne({username: req.user.username}, (err, user) => {
        const ids = user.favorite_artists;
        Artist.aggregate([
            {$unwind: "$genres"},
            {
                $match: {
                    _id: {$in: ids}
                }
            },
            {
                $group: {
                    _id: "$genres",
                    count: {"$sum": 1}
                }
            },
        ]).exec((err, data) => {
            if (err) error(res, "Failed", 500);
            res.status(200).json(data);
        })
    });
};

exports.findSearchHistoryData = (req, res) => {
    User.findOne({username: req.user.username}, (err, user) => {
        const ids = user.search_history;
        History.aggregate([
            {
                $match: {
                    _id: {$in: ids}
                }
            },
            // Count all occurrences
            {
                $group: {
                    _id: {
                        _id: "$type_id",
                    },
                    count: {"$sum": 1}
                }
            },

            // Sum all occurrences and count distinct
            {
                $group: {
                    _id: {
                        _id: "$type_id",
                    },
                    total_count: {"$sum": "$count"},
                    distinct_count: {"$sum": 1}
                }
            }
        ]).exec((err, data) => {
            if (err) error(res, "Failed", 500);
            else if (data.length > 0)
                res.status(200).json(data[0]);
            else
                res.status(200).json({distinct_count: 0, total_count: 0});
        })
    });
};

exports.addFavoriteArtist = (req, res) => {
    User.findOne({username: req.user.username}, (err, user) => {
        user.favorite_artists.push(req.params.id);
        user.save((err, result) => {
            if (err) error(res, err, 202);
            res.status(200).json(result);
        });
    });
};
