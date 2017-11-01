let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Album = new Schema({
        name: {
            type: String,
            required: "Kindly enter the name of the album"
        },
        id: {
            type: String
        },
        imageLink: {
            type: String
        },
        type: {
            type: String
        },
        artist: {
            type: String
        }

    });

module.exports = mongoose.model("Album", Album);