import validator from '../helpers/validate';

const saveProduct = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        description: 'required|string',
        price: 'required|string',
        category: 'required|string',
        image: 'required|string',
        stock: 'required|string',
        reviews: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    });
};

const saveOrder = (req, res, next) => {
    const validationRule = {
        orderStatus: 'required|string',
        userId: 'required|string',
        userName: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    });
};

const saveReview = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        rating: 'required|string',
        comments: 'required|string',
        productId: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    });
};

const saveUser = (req, res, next) => {
    const validationRule = {
        userName: 'required|string',
        email: 'required|email',
        password: 'required|string',
        userType: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    });
};

export = {
    saveProduct,
    saveOrder,
    saveReview,
    saveUser
};
