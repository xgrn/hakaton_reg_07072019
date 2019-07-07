const Mongo = require('../data/MongoDB');
const ObjectId = require('mongodb').ObjectId;

const get = async id => {
    const db = await Mongo.connect();
    return await new Promise(resolve => {
        db.collection('reports').find({_id: ObjectId(id)}).toArray((err, doc) => {
            resolve(doc[0]);
        });
    });
};

const save = async (id, title, data) => {
    const db = await Mongo.connect();
    return await new Promise(resolve => {
        if(id === null) {
            db.collection('reports').insertOne(
                {title: title, report: data},
                (err, res) => {
                    resolve(res.insertedId);
                }
            );
        } else {
            db.collection('reports').updateOne(
                {_id: ObjectId(id)},
                {$set: {title: title, report: data}},
                () => resolve(id)
            );
        }
    });
};

const loadAll = async () => {
    const db = await Mongo.connect();
    return await new Promise(resolve => {
        db.collection('reports').find({}, {title: 1}).toArray((err, doc) => {
            resolve(doc.map(report => ({id: report._id, title: report.title})));
        });
    });
};

module.exports = {
    get: get,
    save: save,
    loadAll: loadAll
}