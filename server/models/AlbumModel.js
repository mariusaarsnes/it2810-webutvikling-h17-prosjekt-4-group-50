let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Song = "SongModel.js",
    Artist = "ArtistModel.js",
    Album =  new Schema({
    name:{
        type: String,
        required: "Kindly enter the name of the album"
    },
    id: {
        type: String
    },
    imageLink: {
        //Om vi bare velger ett bilde, så String, hvis ikke array
        type: String
    },
    type: {
        type: String
    }

});

module.exports = mongoose.model("Album", Album);