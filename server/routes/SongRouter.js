module.exports = (app) => {
    let controller = require("../controllers/SongController");

    app.route('/add_song/name/:name/duration/:duration').post(controller.addSong);
    app.route('/list_songs/').get(controller.findAllSongs);

};