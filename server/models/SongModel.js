let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Song = new Schema({
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
        }
    });

module.exports = mongoose.model("Song", Song);