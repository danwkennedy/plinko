const Url = require('url');
const Headers = require('./headers');

module.exports = class Request {

  constructor(input, {
    method = 'GET',
    headers = {},
    body = '',
    mode = '',
    credentials = '',
    cache = '',
    redirect = '',
    referrer = '',
    integrity = ''
  } = {}) {
    this.url = Url.parse(input, true);
    this.method = method;
    this.headers = new Headers(headers);
    this.body = body;
    this.mode = mode;
    this.credentials = credentials;
    this.cache = cache;
    this.redirect = redirect;
    this.referrer = referrer;
    this.integrity = integrity;
  }
}
