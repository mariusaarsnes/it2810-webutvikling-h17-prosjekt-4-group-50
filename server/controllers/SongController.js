let mongoose = require('mongoose');
Song = mongoose.model("Song");

exports.addSong = (req, res) => {
    let song = new Song({name: req.params.name, duration: req.params.duration});
    song.save((err, task) => {
        if (err) res.send(err);
        res.json(task);
    });
};

exports.findAllSongs = (req, res) => {
    Song.find({}, (err, task) => {
        if (err) res.send(err);
        res.json(task);
    });
};