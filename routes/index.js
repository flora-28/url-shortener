const express = require('express')
const router = express.Router()
const URL = require('../models/url')

//Create random URL
function getRandomString(length) {
  let result = ""
  const elements = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < length; i++)
    result += elements.charAt(Math.floor(Math.random() * elements.length))
  return result
}

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  let originalUrl = req.body.originalUrl
  let commonUrl = ''
  if (process.env.NODE_ENV === "production") {
    commonUrl = 'https://radiant-reaches-97705.herokuapp.com/'
  } else {
    commonUrl = 'http://localhost:3000/'
  }
  let url = getRandomString(5)
  let shortenedUrl = commonUrl + url
  URL.exists({ url })
    .then((duplicate) => {
      if (duplicate) {
        url = getRandomString(5)
      } else {
        URL.create({ originalUrl, url })
        return shortenedUrl
      }
    })
    .then((shortenedUrl) => res.render('result', { shortenedUrl }))
})

router.get('/:url', (req, res) => {
  let url = req.params.url
  URL.find({ url })
    .lean()
    .then((link) => {
      res.redirect(link[0].originalUrl)
    })
    .catch(error => console.log(error))
})

module.exports = router