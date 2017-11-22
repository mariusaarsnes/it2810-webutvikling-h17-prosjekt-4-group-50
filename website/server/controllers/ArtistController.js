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
        if (err) res.send(err)
        else res.status(201).json(task);
    });
};

exports.findArtistsByIds = ((req, res) => {
    const ids = req.params.ids.split(",");
    Artist.find({
            _id: {$in: ids}
        }, (err, artists) => {
            if (err) error(res, err, 500)
            else res.status(200).json(artists);
        }
    );
});

exports.findArtistById = ((req, res) => {
    Artist.find({
            _id: req.params.id
        }, (err, artists) => {
            if (err) error(res, err, 500);
            if (artists.length > 0)
                res.status(200).json(artists[0]);
            else
                res.status(200).json({});
        }
    );
});



exports.findArtists = ((req, res) => {
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
        const temp = {};
        for (let i = 0; i < filters.length; i++) {
            if (temp[filters[i]])
                temp[filters[i]].push(filterValues[i]);
            else
                temp[filters[i]] = [filterValues[i]];
        }
        for (let key in temp) {
            query[key] = { $all: temp[key]};
        }
    }
    const offset = parseInt(req.params.index),
        amount = parseInt(req.params.amount);
    Artist.find(query).sort(req.params.sort === 'none' ? {} : {[req.params.sort]: req.params.type})
        .skip(offset).limit(amount < 0 ? undefined : amount).exec((err, artists) => {
        if (err) error(res, err, 500)
        else res.status(200).json(artists);
    });
});

exports.findAllArtists = (req, res) => {
    Artist.find({}, (err, task) => {
        if (err) res.send(err)
        else res.status(200).json(task);
    });
};
