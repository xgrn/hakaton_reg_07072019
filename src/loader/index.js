import MapOfficialQuality from './map_official_quality'

export default async blocks => {
    const loaders = Promise.all(blocks.map(block => {
        return MapOfficialQuality(block);
    }));
    return (await loaders).filter(res => res !== null).reduce((data, set) => {
        return Object.assign(data, set);
    }, {});
}