module.exports = (app) => {
    let controller = require("../controllers/UserController");

    app.route('/user/').get(controller.findUser);
    app.route('/login').post(controller.login);

};