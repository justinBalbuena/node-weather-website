const request = require('request')
require('dotenv').config()

const geocode_key = process.env.GEOCODE_ACCESS_TOKEN

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=' + geocode_key + '&limit=1'
  request({ url: url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    }
    else if (body.features.length === 0) {
      callback("There are no matching locations", undefined)
    }
    else {
      callback(undefined, {
        latitude: body.features[0].properties.coordinates.longitude,
        longitude: body.features[0].properties.coordinates.latitude,
        location: body.features[0].properties.name
      })
    }
  })
}

module.exports = geocode