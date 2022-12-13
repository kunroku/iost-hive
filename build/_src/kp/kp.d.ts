/// <reference types="node" />
export declare enum AlgorithmType {
    SECP256K1 = 1,
    ED25519 = 2
}
export type KeyPairJSON = {
    type: AlgorithmType;
    seckey: string;
};
export declare abstract class AbstractKeyPair {
    #private;
    get type(): AlgorithmType;
    get name(): string;
    get seckey(): Buffer;
    get pubkey(): Buffer;
    constructor(type: AlgorithmType, seckey: Buffer, pubkey: Buffer);
    abstract sign(data: Buffer): Buffer;
    abstract verify(data: Buffer, sig: Buffer): boolean;
    toJSON(): KeyPairJSON;
    toString(): string;
}
