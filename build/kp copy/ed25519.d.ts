/// <reference types="node" />
import { KeyPairAlgorithm } from './algorithm';
export declare class Ed25519 extends KeyPairAlgorithm {
    sign(data: Buffer): Buffer;
    verify(data: Buffer, signature: Buffer): boolean;
    static fromPublicKey(pubkey: Buffer): Ed25519;
    static fromSecretKey(seckey: Buffer): Ed25519;
    static randomKeyPair(): Ed25519;
}
