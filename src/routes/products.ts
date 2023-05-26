import express from 'express';
const routes = express.Router();

import products from '../controllers/products';

import validation from '../middleware/validate';
import auth from '../middleware/authenticate';

routes.get('/', products.getProducts);
routes.get('/:id', products.getProduct);

routes.post('/', validation.saveProduct, products.createProduct);

routes.put(
    '/:id',
    auth.isAuthenticated,
    validation.saveProduct,
    products.updateProduct
);
routes.delete('/:id', auth.isAuthenticated, products.deleteProduct);

export = routes;
