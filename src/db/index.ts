import dotenv from 'dotenv';
const MongoClient = require('mongodb').MongoClient;

dotenv.config();

let _db: any;

export default {
    initDb: (callback: any) => {
        if (_db) {
            console.log('Db is already initialized');
            return callback(null, _db);
        }
        MongoClient.connect(process.env.MONGODB_URI)
            .then((client: any) => {
                _db = client;
                callback(null, _db);
            })
            .catch((err: Error | any) => {
                callback(err);
            });
    },
    getDb: () => {
        if (!_db) {
            throw new Error('Db not initialized');
        }
        return _db;
    }
};

