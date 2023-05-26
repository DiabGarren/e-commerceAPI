import express from 'express';
const routes = express.Router();
import usersController from '../controllers/users';

import validation from '../middleware/validate';
import auth from '../middleware/authenticate';

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

export = routes;
