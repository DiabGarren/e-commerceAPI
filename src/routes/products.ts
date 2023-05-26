import express from 'express';
import products from '../controllers/products';

import validation from '../middleware/validate';
import auth from '../middleware/authenticate';

const routes = express.Router();

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
