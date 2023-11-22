/// <reference types="node" />
import { AbstractKeyPair, KeyPairAlgorithm } from './abstract-kp';
import { Secp256k1 } from './secp256k1';
import { Ed25519 } from './ed25519';
export declare class KeyPair extends AbstractKeyPair {
    #private;
    constructor(type: KeyPairAlgorithm, pubkey: Buffer, seckey: Buffer | null);
    sign(data: Buffer): import("..").Signature;
    verify(data: Buffer, signature: Buffer): boolean;
    static fromPublicKey(type: KeyPairAlgorithm, pubkey: Buffer): Ed25519 | Secp256k1;
    static fromSecretKey(type: KeyPairAlgorithm, seckey: Buffer): Ed25519 | Secp256k1;
    static parse(data: string): Ed25519 | Secp256k1;
}
