const Mongo = require('../MongoDB');

const load = async req => {
    if(req.params.loader !== 'map_official_quality') return null;
    const db = await Mongo.connect();
    const proj = {region: 1, _id: 0};
    const year = parseInt(req.query.year);
    proj[year] = 1;
    return await new Promise(resolve => {
        db.collection('official_quality').find({}, proj).toArray((err, res) => {
            resolve(res.map(doc => {
                return {
                    region: doc.region.trim(),
                    quality: parseFloat(doc[year]) > 0 || doc[year] === '0' ? Math.round(parseFloat(doc[year])) : null
                };
            }).filter(doc => doc.quality !== null));
        });
    });
};

module.exports = {
    load: load
};