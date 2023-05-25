const express = require('express');
const products = require('../controllers/products');

const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

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
