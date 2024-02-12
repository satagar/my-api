const userController = require('../controllers/user.controller');

module.exports = function (app) {

    app.put("/mba/api/v1/users/:userId", userController.updateUser);
    app.get("/mba/api/v1/users/",userController.getAllUsers);

}