/// <reference types="node" />
import { Buffer } from 'buffer';
import { Signature } from '../crypto';
import { AbstractKeyPair } from './abstract-kp';
export declare class Secp256k1 extends AbstractKeyPair {
    constructor(pubkey: Buffer, seckey: Buffer | null);
    sign(data: Buffer): Signature;
    verify(data: Buffer, signature: Buffer): boolean;
    static fromPublicKey(pubkey: Buffer): Secp256k1;
    static fromSecretKey(seckey: Buffer): Secp256k1;
    static randomKeyPair(): Secp256k1;
}
