var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Artist = new Schema({
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
    popularity: {
        type: Number
    }
});

module.exports = mongoose.model("Artist", Artist);