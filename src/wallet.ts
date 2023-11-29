import { secretbox, randomBytes } from 'tweetnacl';
import { Buffer } from 'buffer';
import { Account } from './account';
import { Bs58 } from './utils/bs58';
import { KeyPairPermission } from './data/params';
import { sha3 } from './utils';

const _password2key = (password: string) => {
  const key = sha3(256, Buffer.from(password));
  return key;
};

export class Wallet {
  readonly #accounts: Account[] = [];
  get accounts() {
    return this.#accounts.map((acc) => acc.name);
  }
  constructor(accounts: Account[]) {
    for (const account of accounts) {
      this.addAccount(account);
    }
  }
  sign(id: string, permission: KeyPairPermission, data: Buffer) {
    const account = this.#accounts.find((e) => e.name === id);
    if (!account) {
      throw new Error(`account not found ${id}`);
    }
    return account.sign(permission, data);
  }
  addAccount(account: Account) {
    const index = this.#accounts.findIndex((e) => e.name === account.name);
    if (index !== -1) {
      throw new Error(`account already exits ${account.name}`);
    }
    this.#accounts.push(Account.parse(account.toString()));
  }
  updateAccount(account: Account) {
    const index = this.#accounts.findIndex((e) => e.name === account.name);
    if (index === -1) {
      throw new Error(`account not found ${account.name}`);
    }
    this.#accounts[index] = Account.parse(account.toString());
  }
  removeAccount(id: string) {
    const index = this.#accounts.findIndex((e) => e.name === id);
    if (index === -1) {
      throw new Error(`account not found ${id}`);
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
