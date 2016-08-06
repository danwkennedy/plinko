const Failover = require('./');
const assert = require('chai').assert;

describe('Failover', () => {

  it(`wraps the strategy function`, () => {
    let strategy = error => error;

    let failover = new Failover(strategy);
    let err = failover.handleError('error');
    assert.equal('error', err);
  });

  it(`exposes the BASIC failover`, () => {
    let basic = Failover.BASIC;

    assert.isOk(basic);
    assert.deepEqual('BASIC', basic.name);
    assert.throws(() => basic.handleError('Error'), 'Error');
  });

});
