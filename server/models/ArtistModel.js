let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Song = "SongModel.js";
let Artist =  new Schema({
    name:{
        type: String,
        required: "Kindly enter the name of the artist"
    },
    albums:{
    },
    songs: [
        {
            type: Song
        }
    ]


});