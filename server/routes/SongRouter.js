module.exports = (app) => {
    console.log("Started song router!");
    var controller = require("../controllers/SongController");

    app.route('/add_song/id/:id/name/:name/type/:type/duration/:duration/').post(controller.addSong);
    app.route('/list_songs/').get(controller.findAllSongs);


}