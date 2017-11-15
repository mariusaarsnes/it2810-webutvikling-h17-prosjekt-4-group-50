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
    router.get("/user", userController.findUser);
    router.get("/aggregate_genres", isAuthorized, userController.findAggregateGenres);
    router.post("/add_favorite_artist/:id", userController.addFavoriteArtist);
    router.get("/update_history", userController.updateSearchHistory);
    router.get("/search_history", userController.findSearchHistory);
    router.get("/search_history_data", userController.findSearchHistoryData);
    router.post('/create_user', (req, res) => userController.createUser(req, res, bcrypt));
    router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/api/logged_in/failed/false/message/Successfully logged in!',
            failureRedirect: '/api/logged_in/failed/true/message/Invalid username or password!',
        })
    );
    router.post('/logout', (req, res) => {
        req.logout();
        res.redirect("/api/message/Successfully logged out!");
    });
    router.get("/logged_in", (req, res) => {
        if (req.user)
            return res.json({result: true});
        return res.json({result: false});
    });

    /**
     * Album related API queries
     */
    //A more advanced query which finds all albums that contains the search string
    //Then sorts it on the attribute given with the sort type given (Ascending/descending)
    //It also supports filtering on the attribute given with the given value
    router.get("/albums/:search_string/:sort/:type/:filter/:filter_value/:index/:amount", albumController.findAlbumsAdvanced);
    //Finds all almbums with ids in the provided array
    router.get("/albums/:ids", albumController.findAlbumsByIds);
    router.get("/album/:id", albumController.findAlbumById);
    router.get("/albums/:search_string/:index/:amount", albumController.findAlbums);
    router.get("/albums", albumController.findAllAlbums);

    router.post("/add_album/:id/:name/:imageLink/:type/:arist", isAdmin, albumController.addAlbum);

    /**
     * Artist related API queries
     */
    //Find all artists with ids in the provided array
    router.get("/artists/:ids", artistController.findArtistsByIds);
    router.get("/artist/:id", artistController.findArtistById);
    router.get("/artists/:search_string/:sort/:type/:filter/:filter_value/:index/:amount", artistController.findArtists);

    router.get("/artists", artistController.findAllArtists);
    router.get("/artists/:search_string/:index/:amount", artistController.findArtists);

    router.post("/add_artist/:id/:name/:genres/:imageLink/:type/:popularity", isAdmin, artistController.addArtist);

    /**
     * Song related API queries
     */
    router.get("/songs/:ids", songController.findSongsByIds);
    router.get("/song/:id", songController.findSongById);
    router.get("/songs/:search_string/:sort/:type/:filter/:filter_value/:index/:amount", songController.findSongsAdvanced);

    router.get("/songs", songController.findAllSongs);
    router.get("/songs/:search_string/:index/:amount", songController.findSongs);

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
