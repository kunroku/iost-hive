import { Bs58 } from '../utils/bs58';
import { AbstractKeyPair, AlgorithmType, KeyPairJSON } from './abstract-kp';
import { Secp256k1 } from './secp256k1';
import { Ed25519 } from './ed25519';

const createKeyPair = (
  type: AlgorithmType,
  pubkey: Buffer | null,
  seckey: Buffer | null,
) => {
  if (seckey) {
    return KeyPair.fromSecretKey(type, seckey);
  } else if (pubkey) {
    return KeyPair.fromPublicKey(type, pubkey);
  } else {
    throw new Error('pubkey or seckey is required');
  }
};

export class KeyPair extends AbstractKeyPair {
  readonly #kp: AbstractKeyPair;
  constructor(type: AlgorithmType, pubkey: Buffer, seckey: Buffer | null) {
    const kp = createKeyPair(type, pubkey, seckey);
    super(kp.type, kp.pubkey, kp.seckey);
    this.#kp = kp;
  }
  sign(data: Buffer) {
    return this.#kp.sign(data);
  }
  verify(data: Buffer, signature: Buffer) {
    return this.#kp.verify(data, signature);
  }
  static fromPublicKey(type: AlgorithmType, pubkey: Buffer) {
    switch (type) {
      case AlgorithmType.SECP256K1: {
        return Secp256k1.fromPublicKey(pubkey);
      }
      case AlgorithmType.ED25519: {
        return Ed25519.fromPublicKey(pubkey);
      }
      default: {
        throw new Error('invalid keypair algorithm type');
      }
    }
  }
  static fromSecretKey(type: AlgorithmType, seckey: Buffer) {
    switch (type) {
      case AlgorithmType.SECP256K1: {
        return Secp256k1.fromSecretKey(seckey);
      }
      case AlgorithmType.ED25519: {
        return Ed25519.fromSecretKey(seckey);
      }
      default: {
        throw new Error('invalid keypair algorithm type');
      }
    }
  }
  static parse(data: string) {
    const json = JSON.parse(data) as KeyPairJSON;
    const pubkey = json.pubkey && Bs58.decode(json.pubkey);
    const seckey = json.seckey && Bs58.decode(json.seckey);
    return createKeyPair(json.type, pubkey, seckey);
  }
}
