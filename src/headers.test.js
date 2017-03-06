const Headers = require('./headers');

describe(`constructor`, () => {
  test(`defaults to empty`, () => {
    const headers = new Headers();
    expect(Array.from(headers.keys()).length).toBe(0);
    expect(Array.from(headers.values()).length).toBe(0);
  });

  test(`creates headers from object properties`, () => {
    const headers = new Headers({ 'Content-type': 'application/json' });
    expect(headers.has('content-type')).toBe(true);
    expect(headers.get('content-type')).toBe('application/json');
  });

  test(`copies a header object's entries`, () => {
    const original = new Headers({ 'Content-type': 'application/json' });
    const copies = new Headers(original);

    expect(Array.from(copies.entries())).toEqual(Array.from(original.entries()));
  });

  test(`copies a Map's entries`, () => {
    const map = new Map([['Content-type', 'application/json']]);
    const headers = new Headers(map);

    expect(Array.from(headers.entries())).toEqual(Array.from(map.entries()));
  });
});

describe(`append()`, () => {

  test(`creates a new header`, () => {
    const headers = new Headers();

    expect(Array.from(headers.keys())).toHaveLength(0);
    headers.append('Content-type', 'application/json');
    const entries = Array.from(headers.entries());
    expect(entries).toHaveLength(1);
    expect(entries[0]).toEqual(['content-type', 'application/json']);
  });

  test(`appends to an existing header`, () => {
    const headers = new Headers(new Map([['content-type', 'application/json']]));

    headers.append('content-type', 'text/html');
    const entries = Array.from(headers.entries());
    expect(entries).toHaveLength(1);
    expect(entries[0]).toEqual(['content-type', 'application/json,text/html']);
  });

});

describe(`has()`, () => {
  test(`returns false if doesn't exist`, () => {
    const headers = new Headers();

    expect(headers.has('content-type')).toBe(false);
  });

  test(`returns true if does exist`, () => {
    const headers = new Headers(new Map([['content-type', 'application/json']]));

    expect(headers.has('content-type')).toBe(true);
  });
});

describe(`get()`, () => {
  test(`returns null if doesn't exist`, () => {
    const headers = new Headers();

    expect(headers.get('content-type')).toBeNull();
  });

  test(`returns the value if it does exist`, () => {
    const headers = new Headers(new Map([['content-type', 'application/json']]));

    expect(headers.get('content-type')).toBe('application/json');
  });
});

describe(`set()`, () => {
  test(`creates a new header`, () => {
    const headers = new Headers();

    expect(headers.has('content-type')).toBe(false);
    headers.set('Content-type', 'application/json');
    expect(headers.get('content-type')).toBe('application/json');
  });

  test(`replaces an existing header`, () => {
    const headers = new Headers(new Map([['content-type', 'application/json']]));

    expect(headers.get('content-type')).toBe('application/json');
    headers.set('Content-type', 'text/html');
    expect(headers.get('content-type')).toBe('text/html');
  });
});

describe(`delete()`, () => {
  test(`deletes the header`, () => {
    const headers = new Headers(new Map([['content-type', 'application/json']]));

    headers.delete('content-type');
    expect(headers.has('content-type')).toBe(false);
  });
});

describe(`keys()`, () => {
  test(`returns all header keys`, () => {
    const headers = new Headers(new Map([
      ['content-type', 'application/json'],
      ['connection', 'keep-alive']
    ]));

    expect(Array.from(headers.keys())).toEqual(['content-type', 'connection']);
  });
});

describe(`values()`, () => {
  test(`returns all header values`, () => {
    const headers = new Headers(new Map([
      ['content-type', 'application/json'],
      ['connection', 'keep-alive']
    ]));

    expect(Array.from(headers.values())).toEqual(['application/json', 'keep-alive']);
  });
});

describe(`entries()`, () => {
  test(`returns all header entries`, () => {
    const entries = [
      ['content-type', 'application/json'],
      ['connection', 'keep-alive']
    ];

    const headers = new Headers(new Map(entries));

    expect(Array.from(headers.entries())).toEqual(entries);
  });
});
