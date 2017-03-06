const Request = require('./request');
const compose = require('./compose');

test(`it should pass the request through the middleware stack`, () => {
  const request = new Request('some/url');

  const middleware = [];

  for (let i = 0; i < 5; i++) {
    middleware.push((calledRequest, next) => {
      expect(calledRequest).toBe(request);
      return next();
    });
  }

  const composed = compose(middleware);

  return composed(request);
});

test(`walks the stack until next is not called`, async () => {
  const middleware = [];
  let counter = 0;

  for (let i = 0; i < 5; i++) {
    middleware.push((request, next) => {
      counter++;
      return next();
    });
  }

  middleware.push(() => {
    return counter;
  });

  middleware.push(() => {
    throw new Error('I should no be called');
  });

  const composed = compose(middleware);

  const response = await composed({});
  expect(counter).toBe(5);
  expect(response).toBe(5);
});

test(`middleware can modify the request`, () => {
  const middleware = [];

  middleware.push((request, next) => {
    request.url = 'another/url';
    return next();
  });

  middleware.push(request => {
    expect(request.url).toBe('another/url');
  });

  const composed = compose(middleware);
  return composed({ url: 'some/url' });
});

test(`throws if the middleware isn't a function`, () => {
  expect(() => {
    compose(['string']);
  }).toThrow('Middleware must be composed of functions!');
});

test(`throws if the middleware isn't in an array`, () => {
  expect(() => {
    compose('string');
  }).toThrow('Middleware stack must be an array!');
})
