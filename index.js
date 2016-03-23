'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

const join = require('path').join
const packageFilename = join(process.cwd(), 'package.json')
const exists = require('fs').existsSync

var name = 'unknown'
var version = 'unknown'

if (exists(packageFilename)) {
  const pkg = require(packageFilename)
  name = pkg.name
  version = pkg.version
  la(is.semver(version), 'service version is not semver', version)
  la(is.unemptyString(name), 'invalid service name', name)
}

function * setVersionResponse (next) {
  yield next
  this.set('X-Service-Name', name)
  this.set('X-Service-Version', version)
}

function configureMiddleware () {
  return setVersionResponse
}

module.exports = configureMiddleware
