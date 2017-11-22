let express = require('express'),
    app = express(),
    port = process.env.PORT || 8084,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    bcrypt = require('bcrypt-nodejs'),
    path = require("path"),
    error = require("./server/router/Error"),
    User = require('./server/models/UserModel'),
    History = require('./server/models/HistoryModel'),
    Album = require('./server/models/AlbumModel'),
    Artist = require('./server/models/ArtistModel'),
    Song = require('./server/models/SongModel');

/**
 * Connects mongoose to the database
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://it2810-50.idi.ntnu.no:27017/test',
    {
        useMongoClient: true
    }, (err) => {
        if (err) throw err;
    });

mongoose.connection.once("open", () => {

});

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


/**
 * Provides a LocalStrategy to passport that checks if a user provided the correct username/password.
 */
passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({username: username.toLowerCase()}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname, "./server/static")));
app.use(session({
    secret: 'oursecretappkey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Middleware function that checks wether the user is logged in or not. Will display a message if it failed to authorize user
 * @param req
 * @param res
 * @param next
 */
isAuthorized = (req, res, next) => {
    if (req.user)
        next();
    else
        error(res, "You don't have access to this page!", 401);
};

/**
 * Middleware function to check if the given user is admin. Is used for most post functions
 * @param req
 * @param res
 * @param next
 */
isAdmin = (req, res, next) => {
    if (req.user && req.user.admin)
        next();
    else
        error(res, "You are not an admin!", 401);
};

/**
 * All the routers for the different parts of the database. The user router also takes in bcrypt, as it needs to
 * encrypt passwords when new users are created
 */
let api = require('./server/router/Router')(isAuthorized, isAdmin, passport);
app.use("/api", api);

/**
 * For all requests excecpt api/*, route to the angular page
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port);
console.log('Server running on port: ' + port);
