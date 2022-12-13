/// <reference types="node" />
import { Signature } from '../crypto';
export declare enum AlgorithmType {
    SECP256K1 = 1,
    ED25519 = 2
}
export type KeyPairJSON = {
    type: AlgorithmType;
    pubkey: string;
    seckey: string | null;
};
export declare class KeyPair {
    #private;
    get type(): AlgorithmType;
    get name(): string;
    get pubkey(): Buffer;
    get seckey(): Buffer;
    constructor(type: number, pubkey: Buffer, seckey: Buffer | null);
    sign(data: Buffer): Signature;
    toJSON(): KeyPairJSON;
    toString(): string;
    static parse(data: string): KeyPair;
}
