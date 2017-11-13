let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Album = new Schema({

        _id: {
            type: String
        },
        name: {
            type: String,
            required: "Kindly enter the name of the album"
        },
        imageLink: {
            type: String
        },
        type: {
            type: String
        },
        artists: {
            type: Array
        },
        songs: {
            type: Array
        }

    });

module.exports = mongoose.model("Album", Album);
