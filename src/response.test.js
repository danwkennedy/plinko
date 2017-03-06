const Response = require('./response');

describe(`constructor()`, () => {

  test(`defaults all options`, () => {
    const response = new Response('');

    expect(Array.from(response.headers.keys())).toHaveLength(0);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.url.hostname).toBeNull();
  });

});

describe(`clone()`, () => {
  test(`copies all fields`, () => {
    const response = new Response('', { status: 400, statusText: 'Nof Found' });
    const copy = response.clone();

    expect(copy).toMatchObject(response);
  });
});

describe(`ok()`, () => {

  test(`returns true if status is 2xx`, () => {
    const response = new Response('', { status: 204 });

    expect(response.ok).toBe(true);
  });

  test(`returns false if status is not 2xx`, () => {
    const response = new Response('', { status: 404, statusText: 'Not Found' });

    expect(response.ok).toBe(false);
  });

});
