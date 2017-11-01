var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Song = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    imageLink: {
        //Om vi bare velger ett bilde, så String, hvis ikke array
        type: String
    },
    type: {
        type: String
    },
    duration: {
        type: Number
    },
    popularity: {
        type: Number
    }
});

module.exports = mongoose.model("Song", Song);