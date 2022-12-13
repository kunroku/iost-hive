/// <reference types="node" />
import { AbstractKeyPair } from './kp';
export declare class Ed25519 extends AbstractKeyPair {
    constructor(secretKey: Buffer);
    sign(data: Buffer): Buffer;
    verify(data: Buffer, sig: Buffer): boolean;
    static randomKeyPair(): Ed25519;
}
