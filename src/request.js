const Url = require('url');
const Headers = require('./headers');
const Body = require('./body');

module.exports = class Request extends Body {

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
    super(body);
    this.url = Url.parse(input, true);
    this.method = method;
    this.headers = new Headers(headers);
    this.mode = mode;
    this.credentials = credentials;
    this.cache = cache;
    this.redirect = redirect;
    this.referrer = referrer;
    this.integrity = integrity;
  }
}
