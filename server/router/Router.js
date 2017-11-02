module.exports = (isAuthorized, isAdmin, passport) => {
    const router = require("express").Router(),
        bcrypt = require("bcrypt-nodejs"), //Requires bcrypt to hash the user passwords
        path = require("path");
    let songController = require("../controllers/SongController"),
        userController = require("../controllers/UserController"),
        albumController = require("../controllers/AlbumController"),
        artistController = require("../controllers/ArtistController"),
        generalController = require("../controllers/GeneralController"),
        spotify = require("../spotify/spotify");

    /**
     * Router middleware. Can be used to verify input (API token?)
     */
    router.use((req, res, next) => {
        next();
    });

    /**
     * Query to populate the database with data from Spotify
     */
    router.get("/populate_database/:access_token", isAdmin, spotify);

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
    router.get("/get_all_albums", isAuthorized, albumController.findAllAlbums);
    router.get("/get_albums/:search_string", isAuthorized, albumController.findAlbums)
        .put("/get_albums/:search_string", isAuthorized, userController.updateSearchHistory);
    router.post("/add_album/:id/:name/:imageLink/:type/:artist", isAdmin, albumController.addAlbum);

    /**
     * Artist related API queries
     */
    router.get("/get_all_artists", isAuthorized, artistController.findAllArtists);
    router.get("/get_artists/:search_string", isAuthorized, artistController.findArtists)
        .put("/get_artists/:search_string", isAuthorized, userController.updateSearchHistory);
    router.post("/add_artist/:id/:name/:genres/:imageLink/:type/:popularity", isAdmin, artistController.addArtist);

    /**
     * Song related API queries
     */
    router.get("/get_all_songs", isAuthorized, songController.findAllSongs);
    router.get("/get_songs/:search_string", isAuthorized, songController.findSongs)
        .put("/get_songs/:search_string", isAuthorized, userController.updateSearchHistory);
    router.post("/add_song/:id/:name/:type/:duration", isAdmin, songController.addSong);

    /**
     * General related API queries (E.g find all artists/songs/albums that contains some text
     */
    router.get("/get_all/:search_string", isAuthorized, generalController.findAll)
        .post("/get_all/:search_string", isAuthorized, userController.updateSearchHistory);

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