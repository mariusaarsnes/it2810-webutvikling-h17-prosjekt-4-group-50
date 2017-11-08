let mongoose = require('mongoose'),
    Album = mongoose.model("Album"),
    error = require("../router/Error");

exports.addAlbum = (req, res) => {
    let album = new Album({
        id: req.params.id,
        name: req.params.name,
        imageLink: req.params.imageLink,
        type: req.params.type,
        artist: req.params.artist,
    });
    album.save((err, album) => {
        if (err) error(res, err, 500);
        res.status(201).json(album);
    });
};

exports.findAlbums = ((req, res) => {
    Album.find({
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, albums) => {
            if (err) error(res, err, 500);
            res.status(200).json(albums);
        }
    );
});

exports.findAlbumsAsc = ((req, res) => {
    const query = {
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    };
    Album.find(req.params.search_string ? query : {}).sort({name: "asc"}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, albums) => {
        if (err) error(res, err, 500);
        res.status(200).json(albums);
    });
});

exports.findAlbumsDesc = ((req, res) => {
    const query = {
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    };
    Album.find(req.params.search_string ? query : {}).sort({name: "desc"}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, albums) => {
        if (err) error(res, err, 500);
        res.status(200).json(albums);
    });
});

exports.findAllAlbums = (req, res) => {
    Album.find({}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, albums) => {
        if (err) res.send(err);
        res.status(200).json(albums);
    });
};