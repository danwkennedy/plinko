const proxyquire = require('proxyquire');
const sinon = require('sinon');
const assert = require('chai').assert;

const Balancer = require('./balancer');
const Failover = require('./failover');

const requestStub = sinon.stub();

const Client = proxyquire('./client', {
  'request-promise': requestStub
});

describe('Client', () => {

  it(`defaults the balancer to RANDOM`, () => {
    let client = new Client([], {});

    assert.equal(client.balancer, Balancer.RANDOM);
  });

  it(`defaults the failover to BASIC`, () => {
    let client = new Client([], {});

    assert.equal(client.failover, Failover.BASIC);
  });

  describe(`send()`, () => {
    let hosts = [ 'localhost' ];
    let defaults = {
      headers: {
        Authorization: 'Bearer 12345'
      }
    };
    let client = new Client(hosts, defaults);

    afterEach(() => requestStub.reset());

    it(`calls request with the built url`, () => {
      requestStub.returns(Promise.resolve());
      let client = new Client(hosts);

      let expectedOptions = {
        url: 'localhost/test-this/thing'
      };

      return client.send('/test-this/thing').then(() => calledWith(requestStub, expectedOptions));
    });

    it(`merges the defaults into the options`, () => {
      requestStub.returns(Promise.resolve());

      let expectedOptions = {
        url: 'localhost/',
        headers: {
          Authorization: 'Bearer 12345'
        },
        qs: {
          pageSize: 1
        }
      };

      return client.send('/', { qs: { pageSize: 1 }}).then(() => calledWith(requestStub, expectedOptions));
    });

    it(`get() sets the request method to GET`, () => {
      requestStub.returns(Promise.resolve());
      let client = new Client(hosts);

      let expectedOptions = {
        url: 'localhost/',
        method: 'GET'
      };

      return client.get('/').then(() => calledWith(requestStub, expectedOptions));
    });

    it(`post() sets the request method to POST`, () => {
      requestStub.returns(Promise.resolve());
      let client = new Client(hosts);

      let expectedOptions = {
        url: 'localhost/',
        method: 'POST'
      };

      return client.post('/').then(() => calledWith(requestStub, expectedOptions));
    });

    it(`head() sets the request method to HEAD`, () => {
      requestStub.returns(Promise.resolve());
      let client = new Client(hosts);

      let expectedOptions = {
        url: 'localhost/',
        method: 'HEAD'
      };

      return client.head('/').then(() => calledWith(requestStub, expectedOptions));
    });

    it(`patch() sets the request method to PATCH`, () => {
      requestStub.returns(Promise.resolve());
      let client = new Client(hosts);

      let expectedOptions = {
        url: 'localhost/',
        method: 'PATCH'
      };

      return client.patch('/').then(() => calledWith(requestStub, expectedOptions));
    });

    it(`put() sets the request method to PUT`, () => {
      requestStub.returns(Promise.resolve());
      let client = new Client(hosts);

      let expectedOptions = {
        url: 'localhost/',
        method: 'PUT'
      };

      return client.put('/').then(() => calledWith(requestStub, expectedOptions));
    });

    function calledWith(stub, options) {
      let args = stub.args[0][0];
      assert.isTrue(stub.calledOnce);

      assert.deepEqual(args, options);
    }

  });

});
