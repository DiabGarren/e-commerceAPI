import { MongoClient } from 'mongodb';

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URI);
        db = await connection.db('ecommerce');
    }, 55000);

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a doc into collection', async () => {
        const reviews = db.collection('orders');

        const mockReview = {
            _id: 'some-review-id',
            'orderStatus': 'statusExample',
            'userId': '646dbbe5475bcb2',
            'userName': 'exampleUsername',
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
        const reviews = db.collection('orders');

        const mockReview = {
            _id: 'some-review-id',
            'orderStatus': 'statusExample',
            'userId': '646dbbe5475bcb2',
            'userName': 'exampleUsername',
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
        const reviews = db.collection('orders');

        const mockReview = {
            _id: 'some-review-id',
            'orderStatus': 'statusExample',
            'userId': '646dbbe5475bcb2',
            'userName': 'exampleUsername',
        };

        await reviews.replaceOne({ _id: 'some-review-id' }, mockReview);

        const updatedReview = await reviews.findOne({ _id: 'some-review-id' });
        expect(updatedReview).toEqual(mockReview);
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
        const reviews = db.collection('orders');

        const confirmDelete = {
            'acknowledged': true,
            'deletedCount': 1
        };

        const deletedReview = await reviews.deleteOne({ _id: 'some-review-id' });
        expect(deletedReview).toEqual(confirmDelete);
    });
});