module.exports = (isAuthorized, passport) => {
    const router = require("express").Router(),
        bcrypt = require("bcrypt-nodejs"), //Requires bcrypt to hash the user passwords
        path = require("path");
    let //songController = require("../controllers/SongController"),
        userController = require("../controllers/UserController");

    /**
     * Router middleware. Can be used to verify input (API token?)
     */
    router.use((req, res, next) => {
        next();
    });

    /**
     * User related API queries
     */
    router.get("/get_user/", isAuthorized, userController.findUser);
    router.get("/get_search_history", isAuthorized, userController.findSearchHistory);
    router.put("/update_search_history/search/:search", isAuthorized, userController.updateSearchHistory);
    router.post('/create_user', (req, res) => userController.createUser(req, res, bcrypt));
    router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/api/logged_in/failed/false/message/Successfully logged in!',
            failureRedirect: '/api/logged_in/failed/true/message/Invalid username or password!',
        })
    );

    /**
     * Album related API queries
     */
    //router.get("/get_albums/name/:name/", albumController.getAlbums);
    //router.post("/add_album/name/:name/id/:id/link/:link/type/:type/artist/:artist", albumController.addAlbum);

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

    /**
     * Default message when entering the API. This could be replaced with a static HTML file as a API guide.
     */
    router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + '/../api.html'));
    });

    return router;
};