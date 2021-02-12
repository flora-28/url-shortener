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
      shortenedUrl: 'jEw32'
    },
    {
      originalUrl: 'http://www.facebook.com',
      shortenedUrl: '0df2G'

    })
    .then(() => {
      console.log('Insert example data done!')
      return db.close()
    })
})