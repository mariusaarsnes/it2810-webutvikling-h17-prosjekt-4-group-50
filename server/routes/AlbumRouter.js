module.exports = (app) => {
    console.log("Started album router!");
    var controller = require("../controllers/AlbumController");

    app.route('/add_album/id/:id/name/:name/genres/:genres/imageLink/:imageLink/' +
        'type/:type/artists/:artists/tracks/:tracks').post(controller.addAlbum);
    app.route('/list_albums/').get(controller.findAllAlbum);

}