/// <reference types="node" />
import { AlgorithmType } from '../kp/kp';
export declare class Signature {
    #private;
    get name(): string;
    get type(): number;
    get pubkey(): Buffer;
    get sig(): Buffer;
    constructor(type: AlgorithmType, pubkey: Buffer, sig: Buffer);
    buffer(): Buffer;
    toJSON(): {
        algorithm: string;
        public_key: string;
        signature: string;
    };
    toString(): string;
    static parse(data: string): Signature;
}
