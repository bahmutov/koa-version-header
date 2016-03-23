'use strict'

const koa = require('koa')
const serviceVersion = require('koa-version-header')
const app = koa()
app.use(serviceVersion({
  name: 'test-service',
  version: '2.3.1'
}))
app.use(function * () {
  this.body = 'pong'
})
const port = 3000
const server = app.listen(port)
console.log('ping server at port', port)

// fake client
const axios = require('axios')
axios.get(`http://localhost:${port}`)
  .then((response) => {
    console.log(response.headers)
  })
  .then(() => server.close())
