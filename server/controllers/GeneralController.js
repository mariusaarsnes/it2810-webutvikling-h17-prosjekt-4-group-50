let mongoose = require('mongoose'),
    Artist = mongoose.model("Artist"),
    Song = mongoose.model("Song"),
    Album = mongoose.model("Album");

exports.findAll = (req, res) => {
    Artist.find({name: { "$regex": req.params.search_string, "$options": "i" }}, (err, artists) => {
        if (err) error(res, err, 500);
        Song.find({name: { "$regex": req.params.search_string, "$options": "i" }}, (err, songs) => {
            if (err) error(res, err, 500);
            Album.find({name: { "$regex": req.params.search_string, "$options": "i" }}, (err, albums) => {
                if (err) error(res, err, 500);
                res.status(200).json(artists.concat(songs).concat(albums));
            });
        });
    });
};

exports.findArtists = ((req, res) => {
    Artist.find({name: {$regex: ".*" + req.params.search_string + "*."}}, (err, artists) => {
        if (err) error(res, err, 500);
        res.status(200).json(artists);
    });
});


exports.findAllArtists = (req, res) => {
    Artist.find({}, (err, task) => {
        if (err) res.send(err);
        res.status(200).json(task);
    });
};