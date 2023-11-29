export type SHA3_HASH_SIZE = 512 | 224 | 256 | 384;
export declare const sha3: (size: SHA3_HASH_SIZE, buf: Buffer) => Buffer;
