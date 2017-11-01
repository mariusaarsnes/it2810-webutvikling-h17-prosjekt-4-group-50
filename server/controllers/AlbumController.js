let mongoose = require('mongoose');
Album = mongoose.model("Album");

exports.addAlbum = (req, res) => {
    let album = new Song({
        id: req.params.id,
        name: req.params.name,
        imageLink: req.params.imageLink,
        type: req.params.type})
    });
    album.save((err, task) => {
        if (err) res.send(err);
    res.status(201).json(task);
    });
};

exports.findAllAlbums = (req, res) => {
    Album.find({}, (err, task) => {
        if (err) res.send(err);
    res.status(201).json(task);
});
};