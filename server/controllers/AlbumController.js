var mongoose = require('mongoose');
Album = mongoose.model("Album");

exports.addAlbum = (req, res) => {
    var album = new Album({id: req.params.id,
        name: req.params.name,
        imageLink: req.params.imageLink,
        type: req.params.type});
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