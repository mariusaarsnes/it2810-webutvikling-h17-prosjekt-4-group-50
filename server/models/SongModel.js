var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Song = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    duration: {
        type: Number
    }
});

module.exports = mongoose.model("Song", Song);