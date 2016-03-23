'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

const join = require('path').join
const packageFilename = join(process.cwd(), 'package.json')
const exists = require('fs').existsSync

var name = 'unknown'
var version = 'unknown'

function isSemanticRelease (ver) {
  return ver === '0.0.0-semantic-release'
}

if (exists(packageFilename)) {
  const pkg = require(packageFilename)
  name = pkg.name
  version = pkg.version
  la(is.semver(version) || isSemanticRelease(version),
    'service version is not semver', version)
  la(is.unemptyString(name), 'invalid service name', name)
}

// allow overwriting via environment variables
if (process.env.SERVICE_NAME) {
  name = process.env.SERVICE_NAME
}
if (process.env.SERVICE_VERSION) {
  version = process.env.SERVICE_VERSION
}

function * setVersionResponse (next) {
  yield next
  this.set('X-Service-Name', name)
  this.set('X-Service-Version', version)
}

function configureMiddleware (options) {
  options = options || {}
  if (is.unemptyString(options.name)) {
    name = options.name
  }
  if (is.unemptyString(options.version)) {
    version = options.version
  }
  return setVersionResponse
}

module.exports = configureMiddleware
