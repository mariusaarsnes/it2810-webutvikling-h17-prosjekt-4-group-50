let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Song = new Schema({
    name: {
        type: String,
        required: "Kindly enter the name of the song"
    },
    id: {
        type: String
    },
    type: {
        type: String
    },
    duration: {
        type: Number
    }
});

module.exports = mongoose.model("Song", Song);