let mongoose = require('mongoose'),
    Song = mongoose.model("Song"),
    error = require("../router/Error");

exports.addSong = (req, res) => {
    let song = new Song({
        id: req.params.id,
        name: req.params.name,
        type: req.params.type,
        duration: req.params.duration
    });
    song.save((err, task) => {
        if (err) res.send(err)
        else res.status(201).json(task);
    });
};

exports.findSongsByIds = ((req, res) => {
    const ids = req.params.ids.split(",");
    Song.find({
            _id: {$in: ids}
        }, (err, songs) => {
            if (err) error(res, err, 500)
            else res.status(200).json(songs);
        }
    );
});

exports.findSongById = ((req, res) => {
    Song.find({
            _id: req.params.id
        }, (err, songs) => {
            if (err) error(res, err, 500);
            else if (songs.length > 0)
                res.status(200).json(songs[0]);
            else
                res.status(500).json({});
        }
    );
});

exports.findSongsAdvanced = ((req, res) => {
    const query = {};
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
    Song.find(query).sort(req.params.sort === 'none' ? {} : {[req.params.sort]: req.params.type})
        .skip(offset).limit(amount < 0 ? undefined : amount).exec((err, songs) => {
        if (err) error(res, err, 500);
        else res.status(200).json(songs);
    });
});

exports.findSongs = ((req, res) => {
    Song.find({
        name: {
            "$regex": req.params.search_string,
            "$options": "i"
        }
    }).skip(parseInt(req.params.index)).limit(parseInt(req.params.amount)).exec((err, songs) => {
        if (err) error(res, err, 500);
        else res.status(200).json(songs);
    });
});

exports.findAllSongs = (req, res) => {
    Song.find({}, (err, task) => {
        if (err) res.send(err)
        else res.status(200).json(task);
    });
};

