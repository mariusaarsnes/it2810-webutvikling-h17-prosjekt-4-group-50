module.exports = (app) => {
    console.log("Started artist router!");
    var controller = require("../controllers/ArtistController");

    app.route('/add_artist/id/:id/name/:name/genres/:genres' +
        '/imageLink/:imageLink/type/:type/popularity/:popularity').post(controller.addArtist);

    app.route('/list_artist/').get(controller.findAllArtists);

}