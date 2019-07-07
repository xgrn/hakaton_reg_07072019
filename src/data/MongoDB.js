const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient('mongodb://localhost:27017/hakaton', {useNewUrlParser: true});

let cb = [];
let db = null;

const flush = () => {
    cb.map(func => func(db));
    cb = [];
};

const connect = () => {
    return new Promise(resolve => {
        if(db) return resolve(db);
        cb.push(resolve);
        if(cb.length > 1) return;
        client.connect( () => {
            db = client.db();
            flush();
        });
    });
}

module.exports = {
    connect: connect
};