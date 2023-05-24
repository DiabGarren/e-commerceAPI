const mongodb = require('../db/index');
const { ObjectId } = require('mongodb');

export = {
    getOrders: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.description = 'Get all orders'
        */
        try {
            const result = await mongodb
                .getDb()
                .db()
                .collection('orders')
                .find();
            const list = await result.toArray();
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getOrderById: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.description = 'Get order by ID.'
        */
        if (!ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json('Must use a valid order id to find an order.');
        }

        const id = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db()
            .collection('orders')
            .find({ _id: id });
        const list = await result.toArray();

        if (list.length === 0) {
            return res
                .status(400)
                .send({ message: 'Cannot find order with id: ' + id });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    },

    createOrder: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.description = 'Create a new order.'
        */
        try {
            const order = {
                orderStatus: req.body.orderStatus,
                userId: req.body.userId,
                userName: req.body.userName,
            };

            const response = await mongodb
                .getDb()
                .db()
                .collection('orders')
                .insertOne(order);

            if (response.acknowledged) {
                res.status(201).json(response);
            } else {
                res.status(500).json(
                    'Some error occurred while creating the order.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateOrder: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.description = 'Update an order'
        */
        if (!ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json('Must use a valid order id to find a order.');
        }

        const id = new ObjectId(req.params.id);
        const order = {
            orderStatus: req.body.orderStatus,
            userId: req.body.userId,
            userName: req.body.userName,
        };

        const response = await mongodb
            .getDb()
            .db()
            .collection('orders')
            .replaceOne({ _id: id }, order);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(
                'Some error occurred while updating the order.'
            );
        }
    },

    deleteOrder: async (req, res) => {
        /*
            #swagger.tags = ['Orders']
            #swagger.description = 'Delete an order.'
        */
        if (!ObjectId.isValid(req.params.id)) {
            return res
                .status(400)
                .json('Must use a valid order id to find a order.');
        }

        const id = new ObjectId(req.params.id);
        const response = await mongodb
            .getDb()
            .db()
            .collection('orders')
            .deleteOne({ _id: id });

        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(
                'Some error occurred while deleting the order.'
            );
        }
    },
};
