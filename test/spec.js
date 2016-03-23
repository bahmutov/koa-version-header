'use strict'

/* global describe, it, before, after */
const koa = require('koa')
const serviceVersion = require('koa-version-header')
const axios = require('axios')
const la = require('lazy-ass')

describe('version header from package', () => {
  var app, server
  const url = 'http://localhost:3000/'

  function verifyExpectedHeaders (response) {
    la(response.headers['x-service-name'] === 'koa-version-header',
      'invalid name', response.headers)
    la(response.headers['x-service-version'] === '0.0.0-semantic-release',
      'invalid version', response.headers)
  }

  before((done) => {
    app = koa()
    app.use(serviceVersion())
    app.use(function * () {
      this.body = 'ok'
    })
    server = app.listen(3000)
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

  after(() => server.close())
})

describe('version header from options', () => {
  var app, server
  const url = 'http://localhost:3000/'

  function verifyExpectedHeaders (response) {
    la(response.headers['x-service-name'] === 'my-test',
      'invalid name', response.headers)
    la(response.headers['x-service-version'] === '2.2.4',
      'invalid version', response.headers)
  }

  before((done) => {
    app = koa()
    app.use(serviceVersion({
      name: 'my-test',
      version: '2.2.4'
    }))
    app.use(function * () {
      this.body = 'ok'
    })
    server = app.listen(3000)
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

  after(() => server.close())
})
