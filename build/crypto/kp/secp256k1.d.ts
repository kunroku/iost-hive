/// <reference types="node" />
import { KeyPair } from './kp';
export declare class Secp256k1 extends KeyPair {
    constructor(secretKey: Buffer);
    sign(data: Buffer): Buffer;
    verify(data: Buffer, sig: Buffer): boolean;
    static randomKeyPair(): Secp256k1;
}
