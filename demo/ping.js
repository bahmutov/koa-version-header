'use strict'

// fake server
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
const serviceDependencies = {
  'test-service': '~2.3.0'
}
const semver = require('semver')
const axios = require('axios')
// Note, url is often from EXTERNAL configuration
const url = `http://localhost:${port}`
axios.get(url)
  .then((response) => {
    const serviceName = response.headers['x-service-name']
    const serviceVersion = response.headers['x-service-version']
    console.log(`got response from ${serviceName}@${serviceVersion}`)
    const expectedVersion = serviceDependencies[serviceName]
    console.log(`is this service version acceptable? We need ${expectedVersion}`)
    const satisfies = semver.satisfies(serviceVersion, expectedVersion)
    console.log(satisfies)
  })
  .then(() => server.close())
