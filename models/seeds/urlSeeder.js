const mongoose = require('mongoose')
const URL = require('../url')

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  URL.create(
    {
      originalUrl: 'https://www.google.com',
      url: 'jEw32'
    },
    {
      originalUrl: 'http://www.facebook.com',
      url: '0df2G'

    })
    .then(() => {
      console.log('Insert example data done!')
      return db.close()
    })
})