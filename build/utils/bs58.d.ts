/// <reference types="node" />
import { Buffer } from 'buffer';
export declare class Bs58 {
    static encode(buf: Buffer): string;
    static decode(str: string): Buffer;
}
