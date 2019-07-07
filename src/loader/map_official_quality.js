import Axios from 'axios'
import qs from 'qs'

export default async block => {
    if(block.type !== 'src_road_official_quality') return null;
    const res = await Axios.get('/api/data/map_official_quality?' + qs.stringify({
        year: block.getFieldValue('YEAR')
    }));
    const out = {};
    out[block.id] = res.data.data;
    return out;
};