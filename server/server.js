require('./models/SongModel');

let express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise; //
mongoose.connect('mongodb://it2810-50.idi.ntnu.no:27017/test',
    {
        useMongoClient: true
    }, (err) => {
        if (err) throw err;
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

let songRoute = require('./routes/SongRouter'),
    albumRoute = require('./routes/AlbumRouter'),
    artistRoute = require('./routes/ArtistRouter');
songRoute(app);
//albumRoute(app);
//artistRoute(app);

app.listen(port);
console.log('Server running on port: ' + port);