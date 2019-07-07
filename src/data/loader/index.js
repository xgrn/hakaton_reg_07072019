const MapOfficialQuality = require('./map_official_quality');

const load = async req => {
    return (await Promise.all([
        MapOfficialQuality.load(req)
    ])).filter(rs => !!rs);
};

module.exports = {
    load: load
};