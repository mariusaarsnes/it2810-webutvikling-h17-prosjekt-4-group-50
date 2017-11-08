let mongoose = require('mongoose'),
    Artist = mongoose.model("Artist"),
    error = require("../router/Error");

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

exports.findArtistsAsc = ((req, res) => {
    const query = {
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    };
    Artist.find(req.params.search_string ? query : {}).sort({name: "asc"}).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, artists) => {
        if (err) error(res, err, 500);
        res.status(200).json(artists);
    });
});

exports.findArtistsByIds = ((req, res) => {
    const ids = req.params.ids.split(",");
    Artist.find({
            _id: {$in: ids}
        }, (err, artists) => {
            if (err) error(res, err, 500);
            res.status(200).json(artists);
        }
    );
});

exports.findArtists = ((req, res) => {
    const query = {
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        },
    };
    //Checks if the filter is not specified as none, append it to our query
    if (req.params.filter !== 'none') {
        query[req.params.filter] = req.params.filter_value;
    }
    const offset = parseInt(req.params.index),
        amount = parseInt(req.params.amount);
    Artist.find(query).sort(req.params.sort === 'none' ? {} : {[req.params.sort]: req.params.type})
        .skip(offset).limit(amount < 0 ? undefined : amount).exec((err, artists) => {
        if (err) error(res, err, 500);
        res.status(200).json(artists);
    });
});

exports.findArtistsDesc = ((req, res) => {
    const query = {
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    };
    const offset = parseInt(req.params.index),
        amount = parseInt(req.params.amount);
    Artist.find(req.params.search_string ? query : {}).sort({name: "desc"})
        .skip(offset).limit(amount < 0 ? undefined : amount).exec((err, artists) => {
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