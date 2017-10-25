module.exports = (app) => {
    console.log("Started song router!");
    var controller = require("../controllers/SongController");

    app.route('/add_song/name/:name/duration/:duration').post(controller.addSong);
    app.route('/list_songs/').get(controller.findAllSongs);

}