class Headers {

  constructor(init = {}) {
    this.headers = toMap(init);
    // if (init instanceof Map || init instanceof Headers) {
    //   this.headers = new Map(Array.from(init.entries()).map(normalizeNameAndValue));
    // } else {
    //   this.headers = new Map(Object.entries(init).map(normalizeNameAndValue));
    // }
  }

  append(name, value) {
    name = normalizeName(name);

    if (this.has(name)) {
      const old = this.get(name);
      this.set(name, `${ old },${ value }`);
    } else {
      this.set(name, value);
    }
  }

  has(name) {
    return this.headers.has(normalizeName(name))
  }

  get(name) {
    return this.headers.get(normalizeName(name)) || null;
  }

  set(name, value) {
    this.headers.set(normalizeName(name), normalizeValue(value));
  }

  delete(name) {
    this.headers.delete(normalizeName(name));
  }

  keys() {
    return this.headers.keys();
  }

  values() {
    return this.headers.values();
  }

  entries() {
    return this.headers.entries();
  }

}

module.exports = Headers;

function toMap(headers) {
  if (headers instanceof Map || headers instanceof Headers) {
    return new Map(headers.entries());
  }

  return new Map(Object.entries(headers).map(normalizeNameAndValue));
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name');
  }
  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }
  return value;
}

function normalizeNameAndValue([name, value]) {
  return [normalizeName(name), normalizeValue(value)];
}
