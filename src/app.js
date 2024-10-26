const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// tells expess what templating engine we are using
// requires a root directory where the views live

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static takes the path to the folder we wanna serve up as the default page
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//first argument is the name of the view to render and the seocnd is the object that contains all of the objects you want that view to render
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Justin Balbuena'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Justin Balbuena'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    name: 'Justin Balbuena',
    title: 'Help',
    helpText: 'This is a help page. If you have any issues please email: '
  })
})


// this lets us configure  what the server should do when someone tries to get the resource at a specific url
// function has two objects, 1 being information abotu the incoming request to the server
// 2 being the response which contains a bunch of methods that allows us to customize what we're gonna send back to the requester

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      
     res.send({
        location: location,
        forecast: forecastData
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    // return statement to stop the function after response is sent cause cant send more than one response
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Justin Balbuena'
  })
})

// * - wild card character being used for 404 errors
app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Justin Balbuena'
  })
})

// starts the server up
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
