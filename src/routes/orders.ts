import express from 'express';
const routes = express.Router();

import orders from '../controllers/orders';
import validation from '../middleware/validate';
import auth from '../middleware/authenticate';

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
