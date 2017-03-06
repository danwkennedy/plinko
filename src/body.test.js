const Body = require('./body');
const Stream = require('stream');

describe(`constructor`, () => {
  test(`converts a string body to a stream`, () => {
    const body = new Body('this is a test');

    expect(body.body).toBeInstanceOf(Stream);
  });

  test(`doesn't change a stream body`, () => {
    const stream = new Stream.Readable();
    stream.push('this is a test');
    stream.push(null);

    const body = new Body(stream);
    expect(body.body).toBe(stream);
  });

  test(`throws if the body can't be converted to a stream`, () => {
    expect(() => new Body({})).toThrow('Could not convert the body to a stream');
  });
});

describe(`json()`, () => {
  test(`returns a json object`, async () => {
    const object = { test: 'this is a test' };
    const body = new Body(JSON.stringify(object));

    const res = await body.json();
    expect(res).toEqual(object);
  });
});

describe(`text()`, () => {
  test(`return a string`, async () => {
    const string = 'this is a test';
    const body = new Body(string);

    const res = await body.text();
    expect(res).toBe(string);
  });
});
