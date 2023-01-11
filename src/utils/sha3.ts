import { SHA3 } from 'sha3';

export type SHA3_HASH_SIZE = 512 | 224 | 256 | 384;

export const sha3 = (size: SHA3_HASH_SIZE, buf: Buffer) => {
  const hash = new SHA3(size);
  hash.update(buf);
  return hash.digest('binary');
};
