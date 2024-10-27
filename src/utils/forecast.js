const request = require('request')
require('dotenv').config();

const forecast_key = process.env.FORECAST_KEY

const forecast = (longitude, latitude,callback) => {
  console.log(forecast_key)
  const url = 'https://api.weatherstack.com/current?access_key=' + forecast_key + '&query=' + latitude + ',' + longitude + '&units=f'
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined)
    } 
    else if (body.error) {
      console.log(body)
      callback("Unable to find location", undefined)
    }
    else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' and feels like ' + body.current.feelslike)
    }
  })
}

module.exports = forecast