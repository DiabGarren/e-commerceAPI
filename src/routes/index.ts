import express from 'express';
import products from './products';

const routes = express.Router();

routes.use('/products', products);

export = routes;