import mongodb from '../db';
import { ObjectId } from 'mongodb';

export = {
    getProducts: async (req, res) => {
        /*
            #swagger.tags = ['Products']
            #swagger.description = 'Get ALL products'
        */
        try {
            const result = mongodb.getDb().db().collection('products').find();
            result.toArray().then((list: any[]) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(list);
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getProduct: async (req, res) => {
        /*
            #swagger.tags = ['Products']
            #swagger.description = 'Get product by ID.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid product id is required to find a product.'
                );
            }
            const id = new ObjectId(req.params.id);
            const result = mongodb
                .getDb()
                .db()
                .collection('products')
                .find({ _id: id });
            result
                .toArray()
                .then((list: any[]) => {
                    if (list.length == 0) {
                        res.status(400).send({
                            message: 'Cannot find product with id: ' + id,
                        });
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json(list[0]);
                    }
                })
                .catch((err: Error | any) => {
                    res.status(500).send({
                        message: 'Error finding product with id=' + id,
                        error: err,
                    });
                });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getProductByCategory: async (req, res) => {
        /*
            #swagger.tags = ['Products']
            #swagger.description = 'Get product by Category.'
        */
        try {
            const category = req.params.category;
            const result = mongodb
                .getDb()
                .db()
                .collection('products')
                .find({ category: category });
            result
                .toArray()
                .then((list: any[]) => {
                    if (list.length == 0) {
                        res.status(400).send({
                            message: 'Cannot find product with category: ' + category,
                        });
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json(list);
                    }
                })
                .catch((err: Error | any) => {
                    res.status(500).send({
                        message: 'Error finding product with category=' + category,
                        error: err,
                    });
                });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createProduct: async (req, res) => {
        /*
            #swagger.tags = ['Products']
            #swagger.description = 'Add a NEW product.'
        */
        try {
            const product = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                image: req.body.image,
                stock: req.body.stock,
                reviews: req.body.reviews
            };
            const response = await mongodb
                .getDb()
                .db()
                .collection('products')
                .insertOne(product);
            if (response.acknowledged) {
                res.status(201).json(response);
            } else {
                res.status(500).json(
                    'Some error occurred while creating the product.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateProduct: async (req, res) => {
        /*
            #swagger.tags = ['Products']
            #swagger.description = 'Update a product by ID.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid product id is required to update a product.'
                );
            }
            const id = new ObjectId(req.params.id);
            const product = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                image: req.body.image,
                stock: req.body.stock,
                reviews: req.body.reviews
            };

            const response = await mongodb
                .getDb()
                .db()
                .collection('products')
                .replaceOne({ _id: id }, product);
            if (response.acknowledged) {
                res.status(204).send();
            } else {
                res.status(500).json(
                    'Some error occurred while updating the product.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteProduct: async (req, res) => {
        /*
            #swagger.tags = ['Products']
            #swagger.description = 'Delete a product by ID.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid product id is required to delete a product.'
                );
            }
            const id = new ObjectId(req.params.id);
            const response = await mongodb
                .getDb()
                .db()
                .collection('products')
                .deleteOne({ _id: id });
            if (response.deletedCount > 0) {
                res.status(200).send();
            } else {
                res.status(500).json(
                    'Some error occurred while deleting the product.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
