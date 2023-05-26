import express from 'express';
const routes = express.Router();

import products from './products';
import orders from './orders';
import users from './users';
import reviews from './reviews';
import passport from 'passport';

routes.use('/', require('./swagger'));
routes.use('/products', products);
routes.use('/orders', orders);
routes.use('/users', users);
routes.use('/reviews', reviews);

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

export = routes;
