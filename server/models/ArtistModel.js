let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Artist = new Schema({
        _id: {
            type: String
        },
        name: {
            type: String,
            required: "Kindly enter the name of the artist"
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
        },
        albums: {
            type: Array
        }

    });

module.exports = mongoose.model("Artist", Artist);