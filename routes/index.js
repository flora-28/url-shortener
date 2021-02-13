const express = require('express')
const router = express.Router()
const URL = require('../models/url')

const production = 'https://radiant-reaches-97705.herokuapp.com/ '
const development = 'http://localhost:3000/'
const commonUrl = process.env.NODE_ENV ? production : development

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

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  originalUrl = req.body.url
  let randomUrl = getRandomString(5)
  preventDuplicate(randomUrl, res)
})

router.get('/:url', (req, res) => {
  const url = req.params.url
  URL.find({ url })
    .lean()
    .then((link) => {
      res.redirect(link[0].originalUrl)
    })
    .catch(error => console.log(error))
})

module.exports = router