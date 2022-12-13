/// <reference types="node" />
export declare abstract class KeyPairAlgorithm {
    #private;
    get pubkey(): Buffer;
    get seckey(): Buffer;
    constructor(pubkey: Buffer, seckey: Buffer | null);
    abstract sign(data: Buffer): Buffer;
    abstract verify(data: Buffer, signature: Buffer): boolean;
}
