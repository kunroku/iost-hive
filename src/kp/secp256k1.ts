import BN from 'bn.js';
import { ec as EC } from 'elliptic';
import { Signature } from '../crypto';
import { AbstractKeyPair, AlgorithmType } from './abstract-kp';

const secp = new EC('secp256k1');

export class Secp256k1 extends AbstractKeyPair {
  constructor(pubkey: Buffer, seckey: Buffer | null) {
    super(AlgorithmType.SECP256K1, pubkey, seckey);
  }
  sign(data: Buffer) {
    const keyPair = secp.keyFromPrivate(this.seckey);
    const sig = keyPair.sign(data);
    const r = sig.r;
    const n = new BN(
      'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141',
      16,
    );
    let s = n.sub(sig.s);
    if (s.gt(sig.s)) {
      s = sig.s;
    }
    const buffer = Buffer.concat([
      Buffer.from(r.toArray()),
      Buffer.from(s.toArray()),
    ]);
    return new Signature(this.type, this.name, this.pubkey, buffer);
  }
  verify(data: Buffer, signature: Buffer) {
    const r = new BN(signature.slice(0, 32).toString('hex'), 16);
    const s = new BN(signature.slice(32, 64).toString('hex'), 16);
    return secp.verify(data, { r, s }, this.pubkey);
  }
  static fromPublicKey(pubkey: Buffer) {
    return new Secp256k1(pubkey, null);
  }
  static fromSecretKey(seckey: Buffer) {
    const kp = secp.keyFromPrivate(seckey);
    return new Secp256k1(
      Buffer.from(kp.getPublic(true, 'hex'), 'hex'),
      Buffer.from(kp.getPrivate('hex'), 'hex'),
    );
  }
  static randomKeyPair() {
    const kp = secp.genKeyPair();
    return new Secp256k1(
      Buffer.from(kp.getPublic(true, 'hex'), 'hex'),
      Buffer.from(kp.getPrivate('hex'), 'hex'),
    );
  }
}
