'use strict'

// example that tries to intercept ALL received responses

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

// fake client using request
// list run time service dependencies
// https://github.com/npm/node-semver#advanced-range-syntax
// const serviceDependencies = {
//   'test-service': '~2.3.0'
// }
// const semver = require('semver')
const axios = require('axios')

axios.interceptors.response.use(function (response) {
  console.log('intercepted response')
  console.log(response)
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

const request = require('request')
// Note, url is often from EXTERNAL configuration, thus hard
// to predict what server version is actually running and responds
const url = `http://localhost:${port}`

// using request - axios does not intercept those requests!
request(url, function (error, response, body) {
  if (error) {
    throw error
  }
  console.log(response.headers, body)
  server.close()
})

// using axios
// axios.get(url)
//   .then((response) => {
//     const serviceName = response.headers['x-service-name']
//     const serviceVersion = response.headers['x-service-version']
//     console.log(`got response from ${serviceName}@${serviceVersion}`)
//     const expectedVersion = serviceDependencies[serviceName]
//     if (typeof expectedVersion === 'string') {
//       console.log(`is this service version acceptable? We need ${expectedVersion}`)
//       // https://github.com/npm/node-semver#ranges-1
//       const satisfies = semver.satisfies(serviceVersion, expectedVersion)
//       console.log(`satisfies? ${satisfies}`)
//     }
//   })
//   .then(() => server.close())
//   .catch(console.error)
  /*
  ping server at port 3000
  got response from test-service@2.3.1
  is this service version acceptable? We need ~2.3.0
  satisfies? true
  */
