let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Search = new Schema({
        search_string: {
            type: String,
        }
    });

module.exports = mongoose.model("Search", Search);