const routes = require('express').Router();
const usersController = require('../controllers/users');

const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

routes.get('/', auth.isAuthenticated, usersController.getUsers);
routes.get('/:id', auth.isAuthenticated, usersController.getUser);

routes.post(
    '/',
    auth.isAuthenticated,
    validation.saveUser,
    usersController.createUser
);

routes.put(
    '/:id',
    auth.isAuthenticated,
    validation.saveUser,
    usersController.updateUser
);

routes.delete('/:id', auth.isAuthenticated, usersController.deleteUser);

module.exports = routes;
