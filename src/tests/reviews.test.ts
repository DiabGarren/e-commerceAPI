import { MongoClient } from 'mongodb';

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        db = await connection.db('ecommerce');
    }, 55000); //Increase the timeout to 55000 ms

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a doc into collection', async () => {
        const reviews = db.collection('reviews');

        const mockReview = {
            _id: 'some-review-id',
            'userName': 'ExampleUsername',
            'rating': 5,
            'comments': 'ExampleComment',
            'productId': 'ExampleId'
        };
        await reviews.insertOne(mockReview);

        const insertedReview = await reviews.findOne({ _id: 'some-review-id' });
        expect(insertedReview).toEqual(mockReview);
    });
});

describe('getOne', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        db = await connection.db('ecommerce');
    }, 55000);

    afterAll(async () => {
        await connection.close();
    });

    it('should get a doc from collection', async () => {
        const reviews = db.collection('reviews');

        const mockReview = {
            _id: 'some-review-id',
            'userName': 'ExampleUsername',
            'rating': 5,
            'comments': 'ExampleComment',
            'productId': 'ExampleId'
        };

        const expectedReview = await reviews.findOne({ _id: 'some-review-id' });
        expect(expectedReview).toEqual(mockReview);
    });
});

describe('update', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        db = await connection.db('ecommerce');
    }, 55000);

    afterAll(async () => {
        await connection.close();
    });

    it('should update a doc from collection', async () => {
        const reviews = db.collection('reviews');

        const mockReview = {
            _id: 'some-review-id',
            'userName': 'Jhon Doe',
            'rating': 1.5,
            'comments': 'Bad product',
            'productId': '123456789'
        };

        await reviews.replaceOne({ _id: 'some-review-id' }, mockReview);

        const updatedReview = await reviews.findOne({ _id: 'some-review-id' });
        expect(updatedReview).toEqual(mockReview);
    });
});

describe('getOneByProductId', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        db = await connection.db('ecommerce');
    }, 55000);

    afterAll(async () => {
        await connection.close();
    });

    it('should get a doc from collection', async () => {
        const reviews = db.collection('reviews');

        const mockReview = {
            _id: 'some-review-id',
            'userName': 'Jhon Doe',
            'rating': 1.5,
            'comments': 'Bad product',
            'productId': '123456789'
        };

        const expectedReview = await reviews.findOne({ productId: '123456789' });
        expect(expectedReview).toEqual(mockReview);
    });
});

describe('getOneByRating', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        db = await connection.db('ecommerce');
    }, 55000);

    afterAll(async () => {
        await connection.close();
    });

    it('should get a doc from collection', async () => {
        const reviews = db.collection('reviews');

        const mockReview = {
            _id: 'some-review-id',
            'userName': 'Jhon Doe',
            'rating': 1.5,
            'comments': 'Bad product',
            'productId': '123456789'
        };

        const expectedReview = await reviews.findOne({ rating: 1.5 });
        expect(expectedReview).toEqual(mockReview);
    });
});

describe('delete', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        db = await connection.db('ecommerce');
    }, 55000);

    afterAll(async () => {
        await connection.close();
    });

    it('should delete a doc from collection', async () => {
        const reviews = db.collection('reviews');

        const confirmDelete = {
            'acknowledged': true,
            'deletedCount': 1
        };

        const deletedReview = await reviews.deleteOne({ _id: 'some-review-id' });
        expect(deletedReview).toEqual(confirmDelete);
    });
});