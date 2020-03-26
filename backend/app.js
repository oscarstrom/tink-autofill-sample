const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const qs = require('qs')
const app = express()
const port = 8080
const url = 'https://api.tink.com/api/v1'
var data = {
  code: null,
  client_id: '74ab7a0de1704bdf8f072cfdf3096f40',
  client_secret: 'c48b23e40db14a7eaeb8b511f0c00866',
  grant_type: 'authorization_code'
}

app.use(cors())
app.use(express.json())

app.get('/accounts', (req, res) => {
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
})

app.post('/authorize', (req, res) => {
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
})

app.listen(port, () => console.log(`Listening on port ${port}`))
