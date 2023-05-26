import mongodb from '../db';
import { ObjectId } from 'mongodb';

export = {
    getReviews: async (req, res) => {
        /*
            #swagger.tags = ['Reviews']
            #swagger.description = 'Get ALL reviews'
        */
        try {
            const result = mongodb.getDb().db().collection('reviews').find();
            result.toArray().then((list: any[]) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(list);
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getReview: async (req, res) => {
        /*
            #swagger.tags = ['Reviews']
            #swagger.description = 'Get review by ID.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid review id is required to find a review.'
                );
            }
            const id = new ObjectId(req.params.id);
            const result = mongodb
                .getDb()
                .db()
                .collection('reviews')
                .find({ _id: id });
            result
                .toArray()
                .then((list: any[]) => {
                    if (list.length == 0) {
                        res.status(400).send({
                            message: 'Cannot find review with id: ' + id,
                        });
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json(list[0]);
                    }
                })
                .catch((err: Error | any) => {
                    res.status(500).send({
                        message: 'Error finding review with id=' + id,
                        error: err,
                    });
                });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createReview: async (req, res) => {
        /*
            #swagger.tags = ['Reviews']
            #swagger.description = 'Add a NEW review.'
        */
        try {
            const review = {
                username: req.body.username,
                rating: req.body.rating,
                comment: req.body.comment
            };
            const response = await mongodb
                .getDb()
                .db()
                .collection('reviews')
                .insertOne(review);
            if (response.acknowledged) {
                res.status(201).json(response);
            } else {
                res.status(500).json(
                    'Some error occurred while creating the review.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateReview: async (req, res) => {
        /*
            #swagger.tags = ['Reviews']
            #swagger.description = 'Update a review by ID.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid review id is required to update a review.'
                );
            }
            const id = new ObjectId(req.params.id);
            const review = {
                username: req.body.username,
                rating: req.body.rating,
                comment: req.body.comment
            };

            const response = await mongodb
                .getDb()
                .db()
                .collection('reviews')
                .replaceOne({ _id: id }, review);
            if (response.acknowledged) {
                res.status(204).send();
            } else {
                res.status(500).json(
                    'Some error occurred while updating the review.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteReview: async (req, res) => {
        /*
            #swagger.tags = ['Reviews']
            #swagger.description = 'Delete a review by ID.'
        */
        try {
            if (!ObjectId.isValid(req.params.id)) {
                res.status(400).json(
                    'A valid review id is required to delete a review.'
                );
            }
            const id = new ObjectId(req.params.id);
            const response = await mongodb
                .getDb()
                .db()
                .collection('reviews')
                .deleteOne({ _id: id });
            if (response.deletedCount > 0) {
                res.status(200).send();
            } else {
                res.status(500).json(
                    'Some error occurred while deleting the review.'
                );
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
