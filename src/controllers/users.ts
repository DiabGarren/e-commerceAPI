const mongodb = require('../db/index');
const { objectId } = require('mongodb');

export = {
    getUsers: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Get ALL users'
        */
        try {
            const result = mongodb.getDb().db().collection('users').find();
            result.toArray().then((list: any[]) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(list);
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getUser: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Get user by ID.'
        */
        try {
            if (!objectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid user id is required to find a user.'
                );
            }
            const id = new objectId(req.params.id);
            const result = mongodb
                .getDb()
                .db()
                .collection('users')
                .find({ _id: id });
            result
                .toArray()
                .then((list: any[]) => {
                    if (list.length == 0) {
                        res.status(400).send({
                            message: 'Cannot find user with id: ' + id,
                        });
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json(list[0]);
                    }
                })
                .catch((err: Error | any) => {
                    res.status(500).send({
                        message: 'Error finding user with id=' + id,
                        error: err,
                    });
                });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createUser: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Add a NEW user.'
        */
        try {
            const user = {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
            };
            const response = await mongodb
                .getDb()
                .db()
                .collection('users')
                .insertOne(user);
            if (response.acknowledged) {
                res.status(201).json(response);
            } else {
                res.status(500).json(
                    'Some error occurred while creating the user.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateUser: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Update a user by ID.'
        */
        try {
            if (!objectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid user id is required to update a user.'
                );
            }
            const id = new objectId(req.params.id);
            const user = {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                userType: req.body.userType,
            };

            const response = await mongodb
                .getDb()
                .db()
                .collection('users')
                .replaceOne({ _id: id }, user);
            if (response.acknowledged) {
                res.status(204).send();
            } else {
                res.status(500).json(
                    'Some error occurred while updating the user.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteUser: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Delete a user by ID.'
        */
        try {
            if (!objectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid user id is required to delete a user.'
                );
            }
            const id = new objectId(req.params.id);
            const response = await mongodb
                .getDb()
                .db()
                .collection('users')
                .deleteOne({ _id: id });
            if (response.deletedCount > 0) {
                res.status(200).send();
            } else {
                res.status(500).json(
                    'Some error occurred while deleting the user.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
