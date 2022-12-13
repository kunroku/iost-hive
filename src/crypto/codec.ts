import Long = require('long');

export class Codec {
  #buffer: Buffer;
  constructor() {
    this.#buffer = Buffer.alloc(0);
  }
  toBuffer() {
    return Buffer.from(this.#buffer);
  }
  pushInt(len: number) {
    const bb = Buffer.alloc(4);
    bb.writeInt32BE(len, 0);
    this.#buffer = Buffer.concat([this.#buffer, bb]);
    return this;
  }
  pushByte(n: number) {
    const bb = Buffer.alloc(1);
    bb.writeUInt8(n, 0);
    this.#buffer = Buffer.concat([this.#buffer, bb]);
    return this;
  }
  pushInt64(n: number) {
    const l = Long.fromString(n.toString());
    const bb = Buffer.alloc(8);
    bb.writeInt32BE(l.high, 0);
    bb.writeInt32BE(l.low, 4);
    this.#buffer = Buffer.concat([this.#buffer, bb]);
    return this;
  }
  pushString(s: string) {
    const bb = Buffer.from(s);
    this.pushInt(bb.length);
    this.#buffer = Buffer.concat([this.#buffer, bb]);
    return this;
  }
  pushBytes(b: Buffer) {
    this.pushInt(b.length);
    this.#buffer = Buffer.concat([this.#buffer, b]);
    return this;
  }
}
