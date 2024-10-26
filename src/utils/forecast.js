const request = require('request')

const forecast = (longitude, latitude,callback) => {
  const url = 'https://api.weatherstack.com/current?access_key=1c5a4b152da6b05f768d7a5c8117814d&query=' + latitude + ',' + longitude + '&units=f'
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined)
    } 
    else if (body.error) {
      callback("Unable to find location", undefined)
    }
    else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' and feels like ' + body.current.feelslike)
    }
  })
}

module.exports = forecast