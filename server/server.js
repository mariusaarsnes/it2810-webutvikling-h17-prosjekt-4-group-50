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
    session = require('express-session'),
    bcrypt = require('bcrypt-nodejs');

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
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

isAuthorized = (req, res, next) => {
    if (req.user)
        next();
    else
        res.redirect("/message/You don't have access to this page!");
};

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname+'/Login.html'));
});

app.get('/create_user', (req, res) => {
    res.sendFile(path.join(__dirname+'/CreateUser.html'));
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/logged_in/failed/false/message/Successfully logged in!',
        failureRedirect: '/logged_in/failed/true/message/Invalid username or password!',
    })
);

app.get('/logged_in/failed/:failed/message/:message', (req, res) => {
    res.json(req.params);
});

app.get('/message/:message', (req, res) => {
    res.json(req.params);
});

let songRoute = require('./routes/SongRouter'), userRoute = require('./routes/UserRouter');
songRoute(app, isAuthorized);
userRoute(app, isAuthorized, bcrypt);

app.listen(port);
console.log('Server running on port: ' + port);