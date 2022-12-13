/// <reference types="node" />
export declare class Codec {
    buf: Buffer;
    constructor();
    pushInt(len: number): this;
    pushByte(n: number): this;
    pushInt64(n: number): this;
    pushString(s: string): this;
    pushBytes(b: Buffer): this;
}
