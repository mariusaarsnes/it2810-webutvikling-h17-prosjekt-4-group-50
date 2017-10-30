require('./models/SongModel');

let express = require('express'),
    app = express(),
    port = process.env.PORT || 8084,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./models/UserModel'),
    path = require('path'),
    session = require('express-session');

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

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({username: username, password: password}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user || !password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/logged_in/failed/false/message/Successfully logged in!',
        failureRedirect: '/logged_in/failed/true/message/Invalid username or password!',
    })
);

app.get('/logged_in/failed/:failed/message/:message', (req, res) => {
    res.json(req.params);
});

function isAuthorized(req, res, next) {
    if (req.user)
        next();
    else
        res.redirect("/message/You don't have access to this page!");
}

let songRoute = require('./routes/SongRouter'), userRoute = require('./routes/UserRouter');
songRoute(app);
userRoute(app);

app.listen(port);
console.log('Server running on port: ' + port);