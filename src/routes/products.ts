import express from 'express';
import products from '../controllers/products';

const routes = express.Router();

routes.get('/', products.getProducts);
routes.get('/:id', products.getProduct);

routes.post('/', products.createProduct);

routes.put('/:id', products.updateProduct);
routes.delete('/:id', products.deleteProduct);

export = routes;