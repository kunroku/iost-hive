/// <reference types="node" />
import { Signature } from '../crypto';
export declare enum KeyPairAlgorithm {
    SECP256K1 = 1,
    ED25519 = 2
}
export type KeyPairJSON = {
    type: KeyPairAlgorithm;
    pubkey: string;
    seckey: string | null;
};
export declare abstract class AbstractKeyPair {
    #private;
    get type(): KeyPairAlgorithm;
    get name(): string;
    get pubkey(): Buffer;
    get seckey(): Buffer;
    constructor(type: number, pubkey: Buffer, seckey: Buffer | null);
    abstract sign(data: Buffer): Signature;
    abstract verify(data: Buffer, signature: Buffer): boolean;
    toJSON(): KeyPairJSON;
    toString(): string;
}
