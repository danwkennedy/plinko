class Failover {
  constructor(strategy, name) {
    this.name = name;
    this.strategy = strategy;
  }

  handleError(err) {
    return this.strategy(err);
  }
}

Failover.BASIC = new Failover(require('./basic'), 'BASIC');

module.exports = Failover;
