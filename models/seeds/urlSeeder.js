const URL = require('../url')
const db = require('../../config/mongoose')

db.once('open', () => {
  URL.create(
    {
      originalUrl: 'https://www.google.com/',
      url: 'jEw32'
    },
    {
      originalUrl: 'https://www.facebook.com/',
      url: '0df2G'

    })
    .then(() => {
      console.log('Insert example data done!')
      return db.close()
    })
})