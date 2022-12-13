/// <reference types="node" />
export declare enum AlgorithmType {
    SECP256K1 = 1,
    ED25519 = 2
}
export type KeyPairJSON = {
    type: AlgorithmType;
    pubkey: string;
    seckey: string | null;
};
export declare abstract class AbstractKeyPair {
    #private;
    get type(): AlgorithmType;
    get name(): string;
    get pubkey(): Buffer;
    get seckey(): Buffer;
    abstract sign(data: Buffer): Buffer;
    abstract verify(data: Buffer, signature: Buffer): boolean;
}
