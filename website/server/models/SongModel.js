let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Song = new Schema({

        _id: {
            type: String
        },
        name: {
            type: String,
            required: "Kindly enter the name of the song"
        },
        type: {
            type: String
        },
        duration: {
            type: Number
        },
        album: {
            type: String
        },
        artists: {
            type: Array
        }
    });

module.exports = mongoose.model("Song", Song);