import { sha3_512, sha3_384, sha3_256, sha3_224 } from 'js-sha3';

export type SHA3_HASH_SIZE = 512 | 384 | 256 | 224;

const getHashFunc = (size: SHA3_HASH_SIZE) => {
  switch (size) {
    case 512:
      return sha3_512;
    case 384:
      return sha3_384;
    case 256:
      return sha3_256;
    case 224:
      return sha3_224;
    default:
      break;
  }
};

export const sha3 = (size: SHA3_HASH_SIZE, buf: Buffer) => {
  // const hash = new SHA3(size);
  // hash.update(buf);
  // return hash.digest('binary');
  return Buffer.from(getHashFunc(size)(buf), 'hex');
};
