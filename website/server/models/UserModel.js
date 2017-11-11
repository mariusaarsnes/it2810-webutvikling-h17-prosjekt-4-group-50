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
        },
        admin: {
            type: Boolean,
            default: false,
        },
        date_registered: {
            type: Date, default: Date.now
        }
    });

module.exports = mongoose.model("User", User);