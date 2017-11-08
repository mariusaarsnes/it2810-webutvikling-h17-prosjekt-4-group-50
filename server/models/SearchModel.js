let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Search = new Schema({
        search_string: {
            type: String,
        },
        date: {
            type: Date, default: Date.now
        }
    });

module.exports = mongoose.model("Search", Search);