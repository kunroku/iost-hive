/// <reference types="node" />
import { KeyPair } from './kp';
export declare class Ed25519 extends KeyPair {
    constructor(secretKey: Buffer);
    sign(data: Buffer): Buffer;
    verify(data: Buffer, sig: Buffer): boolean;
    static randomKeyPair(): Ed25519;
}
