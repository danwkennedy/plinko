const assert = require('chai').assert;
const strategy = require('./random');

describe('Random Balancer', () => {
  it('picks a host from the list', () => {
    let hosts = ['http://localhost', 'http://127.0.0.1' ];
    assert.include(hosts, strategy(hosts));
  });
});
