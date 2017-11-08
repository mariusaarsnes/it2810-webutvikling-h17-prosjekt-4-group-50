let mongoose = require('mongoose'),
    Song = mongoose.model("Song"),
    error = require("../router/Error");

exports.addSong = (req, res) => {
    let song = new Song({
        id: req.params.id,
        name: req.params.name,
        type: req.params.type,
        duration: req.params.duration
    });
    song.save((err, task) => {
        if (err) res.send(err);
        res.status(201).json(task);
    });
};

exports.findSongsAsc = ((req, res) => {
    const query = {
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    };
    Song.find(req.params.search_string ? query : {}).sort({name: "asc"}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, songs) => {
        if (err) error(res, err, 500);
        res.status(200).json(songs);
    });
});

exports.findSongsDesc = ((req, res) => {
    const query = {
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    };
    Song.find(req.params.search_string ? query : {}).sort({name: "desc"}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, songs) => {
        if (err) error(res, err, 500);
        res.status(200).json(songs);
    });
});

exports.findSongsByIds = ((req, res) => {
    const ids = req.params.ids.split(",");
    Song.find({
            _id: { $in: ids }
        }, (err, songs) => {
            if (err) error(res, err, 500);
            res.status(200).json(songs);
        }
    );
});

exports.findSongsAdvanced = ((req, res) => {
    const query = {
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        },
    };
    //Checks if the filter is not specified as none, append it to our query
    if (req.params.filter !== 'none') {
        query[req.params.filter] = req.params.filter_value;
    }
    const offset = parseInt(req.params.index),
        amount = parseInt(req.params.amount);
    Song.find(query).sort(req.params.sort === 'none' ? {} : {[req.params.sort]: req.params.type})
        .skip(offset).limit(amount < 0 ? undefined : amount).exec((err, songs) => {
        if (err) error(res, err, 500);
        res.status(200).json(songs);
    });
});

exports.findSongs = ((req, res) => {
    Song.find({
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, songs) => {
        if (err) error(res, err, 500);
        res.status(200).json(songs);
    });
});

exports.findAllSongs = (req, res) => {
    Song.find({}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, task) => {
        if (err) res.send(err);
        res.status(200).json(task);
    });
};
