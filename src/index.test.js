const Client = require('.');
const Response = require('./response');

test(`the request is passed to the middleware`, () => {
  const client = new Client();

  client.use(request => {
    expect(request.url.href).toBe('some/url');
  });

  return client.request('some/url');
});

test(`the response is returned`, async () => {
  const client = new Client();

  client.use(() => {
    const res = new Response('the body');
    res.url = 'some/url';
    return res;
  });

  const res = await client.request('some/url');
  expect(res.url).toBe('some/url');
  expect(await res.text()).toBe('the body');
});

test(`get() sets the method to GET`, () => {
  const client = new Client();
  client.use(getMethodChecker('GET'));
  return client.get('some/url');
});

test(`post() sets the method to POST`, () => {
  const client = new Client();
  client.use(getMethodChecker('POST'));
  return client.post('some/url');
});

test(`put() sets the method to PUT`, () => {
  const client = new Client();
  client.use(getMethodChecker('PUT'));
  return client.put('some/url');
});

test(`patch() sets the method to PATCH`, () => {
  const client = new Client();
  client.use(getMethodChecker('PATCH'));
  return client.patch('some/url');
});

test(`delete() sets the method to DELETE`, () => {
  const client = new Client();
  client.use(getMethodChecker('DELETE'));
  return client.delete('some/url');
});

test(`head() sets the method to HEAD`, () => {
  const client = new Client();
  client.use(getMethodChecker('HEAD'));
  return client.head('some/url');
})

function getMethodChecker(method) {
  return request => {
    expect(request.method).toBe(method);
  }
}
