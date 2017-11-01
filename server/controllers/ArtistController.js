let mongoose = require('mongoose'),
    Artist = mongoose.model("Artist");

exports.addArtist = (req, res) => {
    let artist = new Artist({
        id: req.params.id,
        name: req.params.name,
        genres: req.params.genres,
        imageLink: req.params.imageLink,
        type: req.params.type,
        popularity: req.params.popularity
    });

    artist.save((err, task) => {
        if (err) res.send(err);
        res.status(201).json(task);
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