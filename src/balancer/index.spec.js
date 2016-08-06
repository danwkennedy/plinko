const Balancer = require('./');
const assert = require('chai').assert;

describe('Balancer', () => {
  it(`wraps the strategy function`, () => {
    let strategy = hosts => hosts[0];

    let balancer = new Balancer(strategy);
    let host = balancer.pick(['localhost', '127.0.0.1']);
    assert.deepEqual('localhost', host);
  });

  it(`exposes the RANDOM balancer`, () => {
    let random = Balancer.RANDOM;

    assert.isOk(random);
    assert.deepEqual('RANDOM', random.name);
  });
});
