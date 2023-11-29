import { sign } from 'tweetnacl';
import { Buffer } from 'buffer';
import { Signature } from '../crypto';
import { AbstractKeyPair, KeyPairAlgorithm } from './abstract-kp';

export class Ed25519 extends AbstractKeyPair {
  constructor(pubkey: Buffer, seckey: Buffer | null) {
    super(KeyPairAlgorithm.ED25519, pubkey, seckey);
  }
  sign(data: Buffer) {
    const buffer = Buffer.from(sign.detached(data, this.seckey));
    return new Signature(this.type, this.name, this.pubkey, buffer);
  }
  verify(data: Buffer, signature: Buffer) {
    return sign.detached.verify(data, signature, this.pubkey);
  }
  static fromPublicKey(pubkey: Buffer) {
    return new Ed25519(pubkey, null);
  }
  static fromSecretKey(seckey: Buffer) {
    const kp = sign.keyPair.fromSecretKey(seckey);
    return new Ed25519(Buffer.from(kp.publicKey), seckey);
  }
  static fromSeed(seed: Buffer) {
    const kp = sign.keyPair.fromSeed(seed);
    return new Ed25519(Buffer.from(kp.publicKey), Buffer.from(kp.secretKey));
  }
  static randomKeyPair() {
    const kp = sign.keyPair();
    return new Ed25519(Buffer.from(kp.publicKey), Buffer.from(kp.secretKey));
  }
}
