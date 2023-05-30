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
        const products = db.collection('products');

        const mockProduct = {
            _id: 'some-product-id',
            name: 'ExampleName',
            description: 'ExampleDesc',
            price: 'ExamplePrice',
            category: 'ExampleCategory',
            image: 'ExampleImage',
            stock: 'ExampleStock',
            reviews: 'ExampleReviews'
        };
        await products.insertOne(mockProduct);

        const insertedProduct = await products.findOne({ _id: 'some-product-id' });
        expect(insertedProduct).toEqual(mockProduct);
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
        const products = db.collection('products');

        const mockProduct = {
            _id: 'some-product-id',
            name: 'ExampleName',
            description: 'ExampleDesc',
            price: 'ExamplePrice',
            category: 'ExampleCategory',
            image: 'ExampleImage',
            stock: 'ExampleStock',
            reviews: 'ExampleReviews'
        };

        const expectedProduct = await products.findOne({ _id: 'some-product-id' });
        expect(expectedProduct).toEqual(mockProduct);
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
        const products = db.collection('products');

        const mockProduct = {
            _id: 'some-product-id',
            name: 'Name',
            description: 'Desc',
            price: 'Price',
            category: 'Category',
            image: 'Image',
            stock: 'Stock',
            reviews: 'Reviews'
        };

        await products.replaceOne({_id: 'some-product-id'}, mockProduct);

        const updatedProduct = await products.findOne({ _id: 'some-product-id' });
        expect(updatedProduct).toEqual(mockProduct);
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
        const products = db.collection('products');

        const confirmDelete = {
            'acknowledged': true,
            'deletedCount': 1
        };

        const deletedProduct = await products.deleteOne({ _id: 'some-product-id' });
        expect(deletedProduct).toEqual(confirmDelete);
    });
});