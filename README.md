# koa-version-header

> Adds X-Version header to the response (Koa middleware)

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![standard style][standard-image]][standard-url]

## Install

    npm install --save koa-version-header

## Use

Add to [koa](http://koajs.com/) middleware list

```js
const koa = require('koa')
const serviceVersion = require('koa-version-header')
const app = koa()
app.use(serviceVersion())
app.use(function * () {
  this.body = 'ok'
})
app.listen(3000)
```

Any request will get a few extra headers `X-Service-...` that you can use to validate
the expected / tested services

```sh
$ http localhost:3000
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: text/plain; charset=utf-8
Date: Wed, 23 Mar 2016 19:37:26 GMT
X-Service-Name: koa-version-header
X-Service-Version: 0.0.0-semantic-release

ok
```

## Name and version

The name and version are read from the `package.json` file if it exists in the current
working folder. You can overwrite / set different values using environment variables

```sh
SERVICE_NAME=my-service SERVICE_VERSION=1.0.0 node server.js 
X-Service-Name: my-service
X-Service-Version: 1.0.0
```

You can also force name and version by specifying them as options to the middleware

```js
const koa = require('koa')
const serviceVersion = require('koa-version-header')
const app = koa()
app.use(serviceVersion({
  name: 'my-service',
  version: '2.3.1'
}))
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2016


* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)


License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/koa-version-header/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/koa-version-header.png?downloads=true
[npm-url]: https://npmjs.org/package/koa-version-header
[ci-image]: https://travis-ci.org/bahmutov/koa-version-header.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/koa-version-header
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
