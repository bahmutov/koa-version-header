'use strict'

const koa = require('koa')
const serviceVersion = require('koa-version-header')
const app = koa()
app.use(serviceVersion())
app.use(function * () {
  this.body = 'ok'
})
app.listen(3000)

console.log('make any request to port 3000 to see X-... headers')
