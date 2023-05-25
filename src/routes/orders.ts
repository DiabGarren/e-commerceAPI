const express = require('express');
const orders = require('../controllers/orders');

const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

const routes = express.Router();

routes.get('/', orders.getOrders);
routes.get('/:id', orders.getOrderById);
routes.post('/', validation.saveOrder, orders.createOrder);
routes.put(
    '/:id',
    auth.isAuthenticated,
    validation.saveOrder,
    orders.updateOrder
);
routes.delete('/:id', auth.isAuthenticated, orders.deleteOrder);

export = routes;
