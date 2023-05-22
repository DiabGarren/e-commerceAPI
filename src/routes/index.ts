import express from 'express';
import products from './products';
import orders from './orders';
import users from './users';
import reviews from './reviews';

const routes = express.Router();

routes.use('/', require('./swagger'));
routes.use('/products', products);
routes.use('/orders', orders);
routes.use('/users', users);
routes.use('/reviews', reviews);

export = routes;