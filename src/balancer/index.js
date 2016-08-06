class Balancer {
  constructor(strategy, name) {
    this.name = name;
    this.strategy = strategy;
  }

  pick(hosts) {
    return this.strategy(hosts);
  }
}

Balancer.RANDOM = new Balancer(require('./random'), 'RANDOM');

module.exports = Balancer;
