const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const URL = require('./models/url')

const production = 'https://radiant-reaches-97705.herokuapp.com/ '
const development = 'http://localhost:3000/'
const commonUrl = process.env.NODE_ENV ? production : development

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//Create random URL
function getRandomString(length) {
  let result = ""
  const elements = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < length; i++)
    result += elements.charAt(Math.floor(Math.random() * elements.length))
  return result
}

//Prevent duplicate URL
function preventDuplicate(url, res) {
  URL.exists({ url })
    .then((duplicate) => {
      if (duplicate) {
        return preventDuplicate(getRandomString(5))
      } else {
        URL.create({ originalUrl, url })
        shortenedUrl = commonUrl + url
        return shortenedUrl
      }
    })
    .then((shortenedUrl) => res.render('result', { shortenedUrl }))
}

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  originalUrl = req.body.url
  let randomUrl = getRandomString(5)
  preventDuplicate(randomUrl, res)
})

app.get('/:url', (req, res) => {
  const url = req.params.url
  URL.find({ url })
    .lean()
    .then((link) => {
      res.redirect(link[0].originalUrl)
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})