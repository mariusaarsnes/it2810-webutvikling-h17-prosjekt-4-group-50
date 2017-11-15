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

exports.findAlbumsByIds = ((req, res) => {
    const ids = req.params.ids.split(",");
    Album.find({
        _id: { $in: ids }
    }, (err, albums) => {
            if (err) error(res, err, 500);
            res.status(200).json(albums);
        }
    );
});

exports.findAlbumById = ((req, res) => {
    Album.find({
            _id: req.params.id
        }, (err, albums) => {
            if (err) error(res, err, 500);
            res.status(200).json(albums[0]);
        }
    );
});

exports.findAlbumsById = ((req, res) => {
    Album.find({
            _id: req.params.id
        }, (err, album) => {
            if (err) error(res, err, 500);
            res.status(200).json(album[0]);
        }
    );
});

exports.findAlbumsAdvanced = ((req, res) => {
    const query = {
    };
    if (req.params.search_string !== "*")
        query["name"] = {
            "$regex": req.params.search_string,
            "$options": "i"
        };
    //Checks if the filter is not specified as none, append it to our query
    if (req.params.filter !== 'none') {
        const filters = req.params.filter.split(","),
            filterValues = req.params.filter_value.split(",");
        for (let i = 0; i < filters.length; i++)
            query[filters[i]] = filterValues[i];
    }
    const offset = parseInt(req.params.index),
        amount = parseInt(req.params.amount);
    Album.find(query).sort(req.params.sort === 'none' ? {} : {[req.params.sort]: req.params.type})
        .skip(offset).limit(amount < 0 ? undefined : amount).exec((err, albums) => {
        if (err) error(res, err, 500);
        res.status(200).json(albums);
    });
});

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

exports.findAllAlbums = (req, res) => {
    Album.find({}, (err, albums) => {
        if (err) res.send(err);
        res.status(200).json(albums);
    });
};
