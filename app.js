const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))

app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})