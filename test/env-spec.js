'use strict'

/* global describe, it, before */
const koa = require('koa')
const serviceVersion = require('koa-version-header')
const axios = require('axios')
const la = require('lazy-ass')

function verifyExpectedHeaders (response) {
  // should match environment values from package.json
  la(response.headers['x-service-name'] === 'my-service',
    'invalid name', response.headers)
  la(response.headers['x-service-version'] === '1.0.1',
    'invalid version', response.headers)
}

describe('version header from env vars', () => {
  var app
  const url = 'http://localhost:3000/'

  before((done) => {
    app = koa()
    app.use(serviceVersion())
    app.use(function * () {
      this.body = 'ok'
    })
    app.listen(3000)
    done()
  })

  it('works', () => {
    return axios.get(url)
      .then((response) => la(response.data === 'ok'))
  })

  it('has headers for GET', () => {
    return axios.get(url)
      .then(verifyExpectedHeaders)
  })

  it('has headers for POST', () => {
    return axios.post(url)
      .then(verifyExpectedHeaders)
  })
})
