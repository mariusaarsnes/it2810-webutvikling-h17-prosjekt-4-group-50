module.exports = (isAuthorized, passport) => {
    const router = require("express").Router(),
        bcrypt = require("bcrypt-nodejs"),
        path = require("path");
    let //songController = require("../controllers/SongController"),
        userController = require("../controllers/UserController");

    /**
     * Router middleware.
     */
    router.use((req, res, next) => {
        next();
    });

    router.get("/", (req, res) => {
        res.json({message: "This is the API"});
    });

    /**
     * Returns the user object of the user currently logged in
     */
    router.get("/get_user/", isAuthorized, userController.findUser);

    /**
     * Creates a new user with the given username/password, then hashes the password
     */
    router.post('/create_user', (req, res) => userController.createUser(req, res, bcrypt));

    /**
     * Used to maintain a user session. Uses the LocalStrategy provided to passport.
     */
    router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/api/logged_in/failed/false/message/Successfully logged in!',
            failureRedirect: '/api/logged_in/failed/true/message/Invalid username or password!',
        })
    );

    /**
     * Called by the authentication function and returns a json object containing if it managed
     * to log in or not, aswell as a message with more information
     */
    router.get('/logged_in/failed/:failed/message/:message', (req, res) => {
        res.json(req.params);
    });

    /**
     * Called by various controllers and returns a json object with a message
     */
    router.get("/message/:message", (req, res) => {
        res.json(req.params);
    });

    /**
     * Temp router for creating a user and logging in. For testing purposes
     */
    router.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname + '/Login.html'));
    });

    router.get('/create_user', (req, res) => {
        res.sendFile(path.join(__dirname + '/CreateUser.html'));
    });

    return router;
};