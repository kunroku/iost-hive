/// <reference types="node" />
export declare enum AlgoType {
    SECP256K1 = 1,
    ED25519 = 2
}
export type KeyPairJSON = {
    type: AlgoType;
    seckey: string;
};
export declare abstract class AbstractKeyPair {
    readonly type: AlgoType;
    readonly seckey: Buffer;
    readonly pubkey: Buffer;
    readonly name: string;
    constructor(type: AlgoType, seckey: Buffer, pubkey: Buffer);
    abstract sign(data: Buffer): Buffer;
    abstract verify(data: Buffer, sig: Buffer): boolean;
    toJSON(): KeyPairJSON;
    toString(): string;
}
