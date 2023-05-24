import express from 'express';
import products from '../controllers/orders';

const routes = express.Router();

routes.get('/', products.getOrders);
routes.get('/:id', products.getOrderById);
routes.post('/', products.createOrder);
routes.put('/:id', products.updateOrder);
routes.delete('/:id', products.deleteOrder);

export = routes;