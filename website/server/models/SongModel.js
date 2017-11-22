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
        popularity: {
            type: Number
        },
        duration: {
            type: Array
        },
        album: {
            type: String
        },
        artists: {
            type: Array
        },
        popularity: {
            type: Number
        }
    });

module.exports = mongoose.model("Song", Song);
