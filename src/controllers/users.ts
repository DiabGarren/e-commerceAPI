import mongodb from '../db/';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';


const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

const comparePassword = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

export = {
    getUsers: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Get ALL users. 
            The password must be: minimum 8 characters, contain at least 1 upper case, 1 lower case and 1 number. 
            All passwords are hashed.'
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
            #swagger.description = 'Get user by ID. The password must be: minimum 8 characters, contain at least 1 upper case, 1 lower case and 1 number. 
            All passwords are hashed.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid user id is required to find a user.'
                );
            }
            const id = new ObjectId(req.params.id);
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
            #swagger.description = 'Add a NEW user. The password must be: minimum 8 characters, contain at least 1 upper case, 1 lower case and 1 number. 
            All passwords are hashed.'
        */
        try {
            const user = {
                userName: req.body.userName,
                email: req.body.email,
                password: await hashPassword(req.body.password),
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
            #swagger.description = 'Update a user by ID. The password must be: minimum 8 characters, contain at least 1 upper case, 1 lower case and 1 number. 
            All passwords are hashed.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid user id is required to update a user.'
                );
            }
            const id = new ObjectId(req.params.id);
            const user = {
                userName: req.body.userName,
                email: req.body.email,
                password: await hashPassword(req.body.password),
                userType: req.body.userType,
            };

            const result = mongodb
                .getDb()
                .db()
                .collection('users')
                .find({ _id: id });
            const hash = await result.toArray();

            const compPass = await comparePassword(req.body.password, hash[0].password);

            if (compPass == true) {
                res.status(400).json('The new password cannot be the same as the old password.');
            } else {
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
            }

        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteUser: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Delete a user by ID. The password must be: minimum 8 characters, contain at least 1 upper case, 1 lower case and 1 number. 
            All passwords are hashed.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid user id is required to delete a user.'
                );
            }
            const id = new ObjectId(req.params.id);
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
