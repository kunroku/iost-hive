/// <reference types="node" />
import { KeyPairAlgorithm } from './algorithm';
export interface KPAlgo {
    randomKeyPair(): KeyPairAlgorithm;
}
export declare class Secp256k1 extends KeyPairAlgorithm {
    sign(data: Buffer): Buffer;
    verify(data: Buffer, signature: Buffer): boolean;
    static fromPublicKey(pubkey: Buffer): Secp256k1;
    static fromSecretKey(seckey: Buffer): Secp256k1;
    static randomKeyPair(): Secp256k1;
}
