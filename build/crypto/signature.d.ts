/// <reference types="node" />
import { Buffer } from 'buffer';
export type SignatureStruct = {
    algorithm: string;
    public_key: string;
    signature: string;
};
export declare class Signature {
    #private;
    get name(): string;
    get type(): number;
    get pubkey(): Buffer;
    get sig(): Buffer;
    constructor(type: number, name: string, pubkey: Buffer, sig: Buffer);
    toBuffer(): Buffer;
    toJSON(): SignatureStruct;
}
