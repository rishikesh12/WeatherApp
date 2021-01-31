const request = require('postman-request');

const forecast = ({latitude, longitude, location}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.API_WEATHER_STACK}&query=${latitude},${longitude}&units=f`;
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback(err.toString(), undefined);
        } else if(body.current) {
            const message = location + '. It is currently '+ body.current.temperature + ' Fahrenheit out with '+ body.current.precip +'% chance of rain';
            callback(undefined, message);
        } else {
            callback(body.error.info, undefined);
        }
    });
}

module.exports = forecast;