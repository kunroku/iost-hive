import * as bs58 from 'bs58';

export class Bs58 {
  static encode(buf: Buffer) {
    return bs58.encode(buf);
  }
  static decode(str: string) {
    return Buffer.from(bs58.decode(str));
  }
}
