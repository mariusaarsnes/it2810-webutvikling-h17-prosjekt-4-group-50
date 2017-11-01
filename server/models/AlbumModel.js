var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Album = new Schema({
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
    }
});

module.exports = mongoose.model("Album", Album);