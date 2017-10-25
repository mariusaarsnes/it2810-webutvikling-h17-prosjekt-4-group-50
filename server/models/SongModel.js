var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Song = new Schema({
    name: {
        type: String
    },
    duration: {
        type: Number
    }
});

module.exports = mongoose.model("Song", Song);