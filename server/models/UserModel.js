let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    User = new Schema({
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        search_history: {
            type: Array,
        }
    });

module.exports = mongoose.model("User", User);