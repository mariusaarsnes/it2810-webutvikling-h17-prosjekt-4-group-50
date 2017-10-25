var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    Song = require("./models/SongModel"),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise; //
mongoose.connect('mongodb://localhost:27017/test',
    {
        useMongoClient: true
    }, (err) => {
        if (err) throw err;
    });
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to database");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var songRoute = require('./routes/SongRouter');
songRoute(app);

app.listen(port);
console.log('Server running on port: ' + port);