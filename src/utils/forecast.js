const request = require('request')
require('dotenv').config();

const forecast_key = process.env.FORECAST_KEY

const forecast = (longitude, latitude, callback) => {
  const url = 'https://api.weatherstack.com/current?access_key=' + forecast_key + '&query=' + latitude + ',' + longitude + '&units=f'
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined)
    } 
    else if (body.error) {
      callback("Unable to find location", undefined)
    }
    else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' and feels like ' + body.current.feelslike + 
        '. The latitude being looked at is: ' + body.location.lat + ' and the longitude being looked at is: ' + body.location.lon)
    }
  })
}

module.exports = forecast