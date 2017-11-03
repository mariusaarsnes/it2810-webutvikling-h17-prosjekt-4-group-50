module.exports = (isAuthorized, isAdmin, passport) => {
    const router = require("express").Router(),
        bcrypt = require("bcrypt-nodejs"), //Requires bcrypt to hash the user passwords
        path = require("path");
    let songController = require("../controllers/SongController"),
        userController = require("../controllers/UserController"),
        albumController = require("../controllers/AlbumController"),
        artistController = require("../controllers/ArtistController"),
        generalController = require("../controllers/GeneralController");

    /**
     * Router middleware. Can be used to verify input (API token?)
     */
    router.use((req, res, next) => {
        next();
    });

    /**
     * User related API queries
     */
    router.get("/user", isAuthorized, userController.findUser);
    router.get("/history", isAuthorized, userController.findSearchHistory);
    router.put("/update_history/search/:search", isAuthorized, userController.updateSearchHistory);
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
    router.get("/albums/:search_string", albumController.findAlbums)
        .put("/albums/:search_string", isAuthorized, userController.updateSearchHistory);
    router.get("/albums_asc/:search_string", isAuthorized, albumController.findAlbumsAsc)
        .put("/albums_asc/:search_string", isAuthorized, userController.updateSearchHistory);
    router.get("/albums_desc/:search_string", isAuthorized, albumController.findAlbumsDesc)
        .put("/albums_desc/:search_string", isAuthorized, userController.updateSearchHistory);
    router.post("/add_album/:id/:name/:imageLink/:type/:arist", isAdmin, albumController.addAlbum);

    /**
     * Artist related API queries
     */
    router.get("/artists", isAuthorized, artistController.findAllArtists);
    router.get("/artists/:search_string", isAuthorized, artistController.findArtists)
        .put("/artists/:search_string", isAuthorized, userController.updateSearchHistory);
    router.get("/artists_asc/:search_string", isAuthorized, artistController.findArtistsAsc)
        .put("/artists_asc/:search_string", isAuthorized, userController.updateSearchHistory);
    router.get("/artists_desc/:search_string", isAuthorized, artistController.findArtistsDesc)
        .put("/artists_desc/:search_string", isAuthorized, userController.updateSearchHistory);
    router.post("/add_artist/:id/:name/:genres/:imageLink/:type/:popularity", isAdmin, artistController.addArtist);

    /**
     * Song related API queries
     */
    router.get("/songs", isAuthorized, songController.findAllSongs);
    router.get("/songs/:search_string", isAuthorized, songController.findSongs)
        .put("/songs/:search_string", isAuthorized, userController.updateSearchHistory);
    router.get("/songs_asc/:search_string", isAuthorized, songController.findSongsAsc)
        .put("/songs_asc/:search_string", isAuthorized, userController.updateSearchHistory);
    router.get("/songs_desc/:search_string", isAuthorized, songController.findSongsDesc)
        .put("/songs_desc/:search_string", isAuthorized, userController.updateSearchHistory);
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
     * Default message when entering the API. This could be replaced with a static HTML file as a API guide.
     */
    router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + '/../static/html/api.html'));
    });

    return router;
};