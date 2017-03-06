const assert = require('assert');
const compose = require('./compose');
const Request = require('./request');

module.exports = class Client {

  /**
   * constructor - Creates an HTTP client
   *
   * @return {Client}   The HTTP client
   */
  constructor() {
    this.middleware = [];
  }

  use(...fns) {
    assert(fns && fns.reduce((state, fn) => state && (typeof fn === 'function'), true), `client.use() requires a function`);

    this.middleware.push(...fns);
    return this;
  }

  get(url, opts = {}) {
    opts.method = 'GET';
    return this.request(url, opts);
  }

  head(url, opts = {}) {
    opts.method = 'HEAD';
    return this.request(url, opts);
  }

  patch(url, opts = {}) {
    opts.method = 'PATCH';
    return this.request(url, opts);
  }

  put(url, opts = {}) {
    opts.method = 'PUT';
    return this.request(url, opts);
  }

  post(url, opts = {}) {
    opts.method = 'POST';
    return this.request(url, opts);
  }

  delete(url, opts = {}) {
    opts.method = 'DELETE';
    return this.request(url, opts);
  }

  request(url, opts = {}) {
    const request = new Request(url, opts);
    const makeRequest = compose(this.middleware);
    return makeRequest(request);
  }
}
