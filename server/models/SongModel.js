let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Song = new Schema({
    name: {
        type: String,
        required: "Kindly enter the name of the song"
    },
    duration: {
        type: Number

    }
});

module.exports = mongoose.model("Song", Song);