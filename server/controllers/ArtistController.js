let mongoose = require('mongoose');
Artist = mongoose.model("Artist");

exports.addArtist = (req, res) => {
    let artist = new Song({id: req.params.id,
        name: req.params.name,
        genres: req.params.genres,
        imageLink: req.params.imageLink,
        type: req.params.type,
        popularity: req.params.popularity})
    });
    artist.save((err, task) => {
        if (err) res.send(err);
    res.status(201).json(task);
    });
};

exports.findAllArtists = (req, res) => {
    Artist.find({}, (err, task) => {
        if (err) res.send(err);
    res.status(201).json(task);
    });
};