let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Artist = new Schema({
        name: {
            type: String,
            required: "Kindly enter the name of the artist"
        },
        id: {
            type: String
        },
        genres: {
            type: Array
        },
        imageLink: {
            //Om vi bare velger ett bilde, så String, hvis ikke array
            type: String
        },
        type: {
            type: String
        },
        popularity: {
            type: Number
        }

    });

module.exports = mongoose.model("Artist", Artist);