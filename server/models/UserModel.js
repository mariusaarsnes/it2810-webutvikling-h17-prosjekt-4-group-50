let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    User =  new Schema({
        username:{
            type: String,
        },
        password: {
            type: String,
        }
    });

module.exports = mongoose.model("User", User);