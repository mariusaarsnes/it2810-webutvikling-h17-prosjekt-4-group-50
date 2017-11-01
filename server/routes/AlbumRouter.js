module.exports = (app) => {
    console.log("Started album router!");
    var controller = require("../controllers/AlbumController");

    app.route('/add_album/id/:id/name/:name/imageLink/:imageLink/type/:type/').post(controller.addAlbum);
    app.route('/list_albums/').get(controller.findAllAlbum);

}