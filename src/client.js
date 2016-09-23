const Balancer = require('./balancer');
const Failover = require('./failover');

const request = require('request-promise');
const _ = require('lodash');

const DEFAULT_CONFIG = {
  json: true
};

module.exports = class Client {

  constructor(hosts, defaults, balancer = Balancer.RANDOM, failover = Failover.BASIC) {
    this.hosts = hosts;
    this.defaults = _.merge({}, DEFAULT_CONFIG, defaults);
    this.balancer = balancer;
    this.failover = failover;
  }

  setBalancer(strategy) {
    this.balancer = strategy;
  }

  setHosts(hosts) {
    this.hosts = hosts;
  }

  setFailover(failover) {
    this.failover = failover;
  }

  get(path, opts = {}) {
    opts.method = 'GET';

    return this.send(path, opts);
  }

  head(path, opts = {}) {
    opts.method = 'HEAD';

    return this.send(path, opts);
  }

  patch(path, opts = {}) {
    opts.method = 'PATCH';

    return this.send(path, opts);
  }

  put(path, opts = {}) {
    opts.method = 'PUT';

    return this.send(path, opts);
  }

  post(path, opts = {}) {
    opts.method = 'POST';

    return this.send(path, opts);
  }

  send(path, opts = {}) {
    let host = this.balancer.pick(this.hosts);
    let options = _.merge({}, this.defaults, opts);

    let url = `${ host }${ path }`;
    options.url = url;

    return request(options).catch(this.failover.handleError);
  }
}
