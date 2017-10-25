let express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    Song = require("./models/SongModel"),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise; //
mongoose.connect('mongodb://localhost/test',
    {
        useMongoClient: true
    }, (err) => {
        if (err) throw err;
        else console.log("Connected");
        Song.find({}, (err, task) => {
            console.log(task);
        });
    });
const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to database");
});

db.on("error", (err) => {
    console.log(err);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let songRoute = require('./routes/SongRouter');
songRoute(app);

app.listen(port);
console.log('Server running on port: ' + port);