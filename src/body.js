const Stream = require('stream');

module.exports = class Body {

  constructor(body) {
    const stream = toStream(body);

    if (!stream) {
      throw new Error('Could not convert the body to a stream');
    }

    this.body = stream;
  }

  // TODO
  // async arrayBuffer() {
  // }

  // TODO
  // async blob() {
  // }

  // TODO
  // async formData() {
  // }

  async json() {
    const string = await this.text();
    return JSON.parse(string);
  }

  async text() {
    return new Promise((resolve, reject) => {
      let string = '';

      this.body.on('data', data => string += data);
      this.body.on('end', () => resolve(string));
      this.body.on('error', err => reject(err));
    });
  }
}

function toStream(body) {
  if (body instanceof Stream) {
    return body;
  }

  if (typeof body === 'string') {
    const stream = new Stream.Readable();
    stream.push(body);
    stream.push(null);
    return stream;
  }

  return null;
}
