let mongoose = require('mongoose');
    Song = mongoose.model("Song");

exports.addSong = (req, res) => {
    let song = new Song({
        id: req.params.id,
        name: req.params.name,
        type: req.params.type,
        duration: req.params.duration})
    });
    song.save((err, task) => {
        if (err) res.send(err);
        res.status(201).json(task);
    });
};

exports.findAllSongs = (req, res) => {
    Song.find({}, (err, task) => {
        if (err) res.send(err);
        res.status(200).json(task);
    });
};
