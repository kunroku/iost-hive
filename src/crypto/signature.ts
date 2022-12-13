import { Codec } from './codec';

export class Signature {
  readonly #name: string;
  readonly #type: number;
  readonly #pubkey: string;
  readonly #sig: string;
  get name() {
    return this.#name;
  }
  get type() {
    return this.#type;
  }
  get pubkey() {
    return Buffer.from(this.#pubkey, 'base64');
  }
  get sig() {
    return Buffer.from(this.#sig, 'base64');
  }
  constructor(type: number, name: string, pubkey: Buffer, sig: Buffer) {
    this.#type = type;
    this.#name = name;
    this.#pubkey = Buffer.from(pubkey).toString('base64');
    this.#sig = Buffer.from(sig).toString('base64');
  }
  toBuffer() {
    const c = new Codec();
    c.pushByte(this.type);
    c.pushBytes(this.sig);
    c.pushBytes(this.pubkey);
    return c.toBuffer();
  }
  toJSON() {
    return {
      algorithm: this.name,
      public_key: this.#pubkey,
      signature: this.#sig,
    };
  }
}
