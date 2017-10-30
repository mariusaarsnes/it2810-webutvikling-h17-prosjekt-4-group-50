module.exports = (app, isAuthorized, bcrypt) => {

    let controller = require("../controllers/UserController");
    app.route('/user/').get(isAuthorized, controller.findUser);
    app.route('/create_user').post((req, res) => controller.createUser(req, res, bcrypt));

};