require('./models/SongModel');

let express = require('express'),
    app = express(),
    port = process.env.PORT || 8085,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/UserModel'),
    session = require('express-session'),
    bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise; //
mongoose.connect('mongodb://it2810-50.idi.ntnu.no:27017/test',
    {
        useMongoClient: true
    }, (err) => {
        if (err) throw err;
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
        User.findOne({username: username}, (err, user) => {
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
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Checks wether the user is logged in or not, will display a message if it failed to authorize user
 * @param req
 * @param res
 * @param next
 */
isAuthorized = (req, res, next) => {
    if (req.user)
        next();
    else
        res.redirect("/api/message/You don't have access to this page!");
};

/**
 * All the routers for the different parts of the database. The user router also takes in bcrypt, as it needs to
 * encrypt passwords when new users are created
 */
let api = require('./routes/Router')(isAuthorized, passport);
app.use("/api", api);

app.listen(port);
console.log('Server running on port: ' + port);