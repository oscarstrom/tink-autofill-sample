require('dotenv').config()
const fetch = require('node-fetch')
const qs = require('qs')
const url = 'https://api.tink.com/api/v1'

var data = {
  code: null,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  grant_type: 'authorization_code'
}

exports.authorize = (req, res) => {
  data.code = req.body.authorizationCode
  fetch(url + '/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify(data)
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      res.send(json)
    })
}

exports.getAccounts = (req, res) => {
  const accessToken = req.query.accessToken
  fetch(url + '/accounts/list', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      res.send(json)
    })
}

exports.getURL = (req, res) => {
  res.send(process.env.TINK_URL)
}
