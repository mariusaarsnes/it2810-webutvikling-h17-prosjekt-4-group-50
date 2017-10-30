let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Song = "SongModel.js",
    Album = "AlbumModel.js",
    Artist =  new Schema({
    name:{
        type: String,
        required: "Kindly enter the name of the artist"
    },
    albums:[
        {
            type: Album
        }
    ],
    songs: [
        {
            type: Song
        }
    ]

});

module.exports = mongoose.model("Artist", Artist);