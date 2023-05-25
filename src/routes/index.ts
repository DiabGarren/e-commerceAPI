const express = require('express');
const products = require('./products');
const orders = require('./orders');
const users = require('./users');
//const reviews = require('./reviews');
const passport = require('passport');

const routes = express.Router();

routes.use('/', require('./swagger'));
routes.use('/products', products);
routes.use('/orders', orders);
routes.use('/users', users);
//routes.use('/reviews', reviews);

// eslint-disable-next-line @typescript-eslint/no-empty-function
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
