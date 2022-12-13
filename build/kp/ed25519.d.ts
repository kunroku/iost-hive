/// <reference types="node" />
import { Signature } from '../crypto';
import { AbstractKeyPair } from './abstract-kp';
export declare class Ed25519 extends AbstractKeyPair {
    constructor(pubkey: Buffer, seckey: Buffer | null);
    sign(data: Buffer): Signature;
    verify(data: Buffer, signature: Buffer): boolean;
    static fromPublicKey(pubkey: Buffer): Ed25519;
    static fromSecretKey(seckey: Buffer): Ed25519;
    static randomKeyPair(): Ed25519;
}
