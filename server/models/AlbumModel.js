var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Album = new Schema({
    id: {
        type: String
    },
    name: {
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
    artists: {
        //List of artist id's
        type: Array
    },
    tracks: {
        //List of track id's
        type: Array
    }
});

module.exports = mongoose.model("Album", Album);