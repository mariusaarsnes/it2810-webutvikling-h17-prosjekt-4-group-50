let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    History = new Schema({
        type: {
            type: String,
        },
        type_id: {
            type: String
        },
        date: {
            type: Date, default: Date.now
        },
    });

module.exports = mongoose.model("History", History);
