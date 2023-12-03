/// <reference types="node" />
import { Buffer } from 'buffer';
export declare class Codec {
    #private;
    constructor();
    toBuffer(): Buffer;
    pushInt(len: number): this;
    pushByte(n: number): this;
    pushInt64(n: number): this;
    pushString(s: string): this;
    pushBytes(b: Buffer): this;
}
