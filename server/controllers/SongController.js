let mongoose = require('mongoose'),
    Song = mongoose.model("Song");

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
    Song.find({
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).sort({name: "asc"}).skip(req.params.index).limit(req.params.amount).exec((err, songs) => {
        if (err) error(res, err, 500);
        res.status(200).json(songs);
    });
});

exports.findSongsDesc = ((req, res) => {
    Song.find({
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).sort({name: "desc"}).skip(req.params.index).limit(req.params.amount).exec((err, songs) => {
        if (err) error(res, err, 500);
        res.status(200).json(songs);
    });
});


exports.findSongs = ((req, res) => {
    Song.find({
        username: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).skip(req.params.index).limit(req.params.amount).exec((err, songs) => {
        if (err) error(res, err, 500);
        res.status(200).json(songs);
    });
});

exports.findAllSongs = (req, res) => {
    Song.find({}).skip(req.params.index).limit(req.params.amount).exec((err, task) => {
        if (err) res.send(err);
        res.status(200).json(task);
    });
};
