let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Song = "SongModel.js",
    Artist = "ArtistModel.js",
    Album =  new Schema({
    name:{
        type: String,
        required: "Kindly enter the name of the album"
    },
    artists:[
        {
            type: Artist
        }
    ],
    songs: [
        {
            type: Song
        }
    ]

});

module.exports = mongoose.model("Album", Album);