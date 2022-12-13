/// <reference types="node" />
export declare enum AlgoType {
    SECP256K1 = 1,
    ED25519 = 2
}
export declare abstract class KeyPair {
    readonly algoType: AlgoType;
    readonly secretKey: Buffer;
    readonly publicKey: Buffer;
    readonly algoName: string;
    constructor(algoType: AlgoType, secretKey: Buffer, publicKey: Buffer);
    abstract sign(data: Buffer): Buffer;
    abstract verify(data: Buffer, sig: Buffer): boolean;
}
