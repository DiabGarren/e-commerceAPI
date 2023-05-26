import express from 'express';
const routes = express.Router();

import reviews from '../controllers/reviews';

import validation from '../middleware/validate';
import auth from '../middleware/authenticate';

routes.get('/', reviews.getReviews);
routes.get('/:id', reviews.getReview);

routes.post('/', validation.saveReview, reviews.createReview);

routes.put('/:id',
    auth.isAuthenticated,
    validation.saveReview,
    reviews.updateReview
);

routes.delete('/:id', reviews.deleteReview);

export = routes;