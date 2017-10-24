var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    Song = require("./models/SongModel"),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gruppe50:gruppe50@it2810-shard-00-00-qogwh.mongodb.net:27017,it2810-shard-00-01-qogwh.mongodb.net:27017,it2810-shard-00-02-qogwh.mongodb.net:27017/test?ssl=true&replicaSet=IT2810-shard-0&authSource=admin',
    {
        useMongoClient: true
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