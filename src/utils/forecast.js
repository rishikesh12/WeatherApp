const request = require('postman-request');

const forecast = ({latitude, longitude, location}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a76f9fd2c219169d4595132de6e6bee4&query=${latitude},${longitude}&units=f`;
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