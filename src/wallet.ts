import { secretbox, randomBytes } from 'tweetnacl';
import { Buffer } from 'buffer';
import { Account } from './account';
import { Bs58 } from './utils/bs58';
import { KeyPairPermission, NetworkConfig } from './data/params';
import { sha3 } from './utils';
import { Signature } from './crypto';

const _password2key = (password: string) => {
  const key = sha3(256, Buffer.from(password));
  return key;
};

export abstract class AbstractWallet {
  abstract accounts: string[];
  abstract sign(
    id: string,
    permission: KeyPairPermission,
    data: Buffer,
  ): Promise<Signature[]>;
}

export class Wallet extends AbstractWallet {
  readonly #accounts: Account[] = [];
  get accounts() {
    return this.#accounts.map((acc) => acc.name);
  }
  constructor(accounts: Account[]) {
    super();
    for (const account of accounts) {
      this.add(account);
    }
  }
  async sign(name: string, permission: KeyPairPermission, data: Buffer) {
    const account = this.#accounts.find((e) => e.name === name);
    if (!account) {
      throw new Error(`account not found ${name}`);
    }
    return account.sign(permission, data);
  }
  async authorize(name: string, network: NetworkConfig) {
    const index = this.#accounts.findIndex((e) => e.name === name);
    if (index === -1) {
      throw new Error(`account not found ${name}`);
    }
    const account = this.#accounts[index];
    return await account.authorize(network);
  }
  add(account: Account) {
    const index = this.#accounts.findIndex((e) => e.name === account.name);
    if (index !== -1) {
      throw new Error(`account already exits ${account.name}`);
    }
    this.#accounts.push(Account.parse(account.toString()));
  }
  update(account: Account) {
    const index = this.#accounts.findIndex((e) => e.name === account.name);
    if (index === -1) {
      throw new Error(`account not found ${account.name}`);
    }
    this.#accounts[index] = Account.parse(account.toString());
  }
  remove(name: string) {
    const index = this.#accounts.findIndex((e) => e.name === name);
    if (index === -1) {
      throw new Error(`account not found ${name}`);
    }
    this.#accounts.splice(index, 1);
  }
  verify(
    id: string,
    permission: KeyPairPermission,
    data: Buffer,
    signature: Buffer,
  ) {
    const index = this.#accounts.findIndex((e) => e.name === id);
    if (index === -1) {
      throw new Error(`account not found ${id}`);
    }
    const account = this.#accounts[index];
    return account.verify(permission, data, signature);
  }
  toString(password = ''): string {
    const nonce = randomBytes(secretbox.nonceLength);
    const key = _password2key(password);
    const accounts = this.#accounts.map((acc) => acc.toString());
    const str = JSON.stringify(accounts);
    const box = secretbox(Buffer.from(str, 'utf-8'), nonce, key);
    const nonceBs58 = Bs58.encode(Buffer.from(nonce));
    const boxBs58 = Bs58.encode(Buffer.from(box));
    return `${nonceBs58}:${boxBs58}`;
  }
  static parse(data: string, password = '') {
    const [nonce, encrypted] = data.split(':');
    const nonceBuffer = Bs58.decode(nonce);
    const encryptedBuffer = Bs58.decode(encrypted);
    const key = _password2key(password);
    const decrypted = Buffer.from(
      secretbox.open(encryptedBuffer, nonceBuffer, key),
    );
    const accounts = JSON.parse(decrypted.toString('utf-8')) as string[];
    const wallet = new Wallet(
      accounts.map((account) => Account.parse(account)),
    );
    return wallet;
  }
}
