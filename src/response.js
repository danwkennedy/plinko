const Body = require('./body');
const Headers = require('./headers');
const Url = require('url');

module.exports = class Response extends Body {

  constructor(body, {
    headers = {},
    status = 200,
    statusText = 'OK',
    url = ''
  } = {}) {
    super(body);
    this.headers = new Headers(headers);
    this.status = status;
    this.statusText = statusText;
    this.url = Url.parse(url);
  }

  clone() {
    return new Response(this.body, {
      status: this.status,
      statusText: this.statusText,
      headers: this.headers
    });
  }

  get ok() {
    return this.status >= 200 && this.status < 300
  }
}
