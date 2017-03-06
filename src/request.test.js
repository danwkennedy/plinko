const Request = require('./request');

describe(`constructor()`, () => {

  test(`defaults missing values`, () => {
    const request = new Request('some/url');

    expect(request.url.href).toBe('some/url');
    expect(request.method).toBe('GET');
    expect(Array.from(request.headers.entries)).toHaveLength(0);
    expect(request.mode).toBe('');
    expect(request.credentials).toBe('');
    expect(request.cache).toBe('');
    expect(request.redirect).toBe('');
    expect(request.referrer).toBe('');
    expect(request.integrity).toBe('');
  });

  test(`throws for an invalid url`, () => {
    expect(() => new Request({})).toThrow();
  });

  test(`it converts a string input to a URL`, () => {
    const request = new Request('http://www.google.com');

    expect(request.url.protocol).toBe('http:');
    expect(request.url.hostname).toBe('www.google.com');
  });

});
