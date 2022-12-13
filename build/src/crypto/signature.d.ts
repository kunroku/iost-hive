/// <reference types="node" />
import { AbstractKeyPair } from '../kp/kp';
export declare class Signature {
    readonly name: AbstractKeyPair['name'];
    readonly type: AbstractKeyPair['type'];
    readonly pubkey: AbstractKeyPair['pubkey'];
    readonly sig: Buffer;
    constructor(name: AbstractKeyPair['name'], type: AbstractKeyPair['type'], pubkey: AbstractKeyPair['pubkey'], sig: Buffer);
    bytes(): Buffer;
    toJSON(): {
        algorithm: string;
        public_key: string;
        signature: string;
    };
}
