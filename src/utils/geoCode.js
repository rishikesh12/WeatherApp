const request = require('postman-request');

const geoCode = (locationName, callback) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=pk.eyJ1IjoicmlzaGlrZXNoMTIiLCJhIjoiY2toa2hhb3h4MjNhcTJ6bDZuOWw0dWI5dCJ9.JVDeCIoNTnO8LmAlJsTaiQ&limit=1`;
    request({url: mapboxUrl, json: true}, (err, {body}) => {
    if(err) {
        console.error(err.toString());
        callback(err.toString(), undefined);
    } else if (body.features && body.features.length) {
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        const data = {
            latitude,
            longitude,
            location: body.features[0].place_name
        };
        callback(undefined, data);
    } else {
        console.error('Cannot find the provided location:'+ body.message);
        callback(body.message, undefined);
    } 
    });
}

module.exports = geoCode;