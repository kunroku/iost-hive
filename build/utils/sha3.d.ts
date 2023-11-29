export type SHA3_HASH_SIZE = 512 | 384 | 256 | 224;
export declare const sha3: (size: SHA3_HASH_SIZE, buf: Buffer) => Buffer;
