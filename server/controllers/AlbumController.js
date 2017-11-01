var mongoose = require('mongoose');
Album = mongoose.model("Album");

exports.addAlbum = (req, res) => {
    var album = new Album({id: req.params.id,
        name: req.params.name,
        genres: req.params.genres,
        imageLink: req.params.imageLink,
        type: req.params.type,
        artists: req.params.artists,
        tracks: req.params.tracks});
    album.save((err, task) => {
        if (err) res.send(err);
    res.json(task);
});
};

exports.findAllAlbum = (req, res) => {
    Album.find({}, (err, task) => {
        if (err) res.send(err);
    res.json(task);
});
};