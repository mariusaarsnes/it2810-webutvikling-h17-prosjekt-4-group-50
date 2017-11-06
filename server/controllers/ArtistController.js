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
    Artist.find({
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, artists) => {
        if (err) error(res, err, 500);
        res.status(200).json(artists);
    });
});

exports.findArtistsAsc = ((req, res) => {
    Artist.find({
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).sort({name: "asc"}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, artists) => {
        if (err) error(res, err, 500);
        res.status(200).json(artists);
    });
});

exports.findArtistsDesc = ((req, res) => {
    Artist.find({
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).sort({name: "desc"}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, artists) => {
        if (err) error(res, err, 500);
        res.status(200).json(artists);
    });
});

exports.findAllArtists = (req, res) => {
    Artist.find({}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, task) => {
        if (err) res.send(err);
        res.status(200).json(task);
    });
};