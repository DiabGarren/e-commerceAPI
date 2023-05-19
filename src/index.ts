import express from 'express';
import bodyParser from 'body-parser';
import mongoDb from './db';

const app = express();
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    })
    .use('/', require('./routes'));

mongoDb.initDb((err: Error | any) => {
    if (err) {
        console.log('Not working');
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to Db and listening on ${port}`);
    }
});