import { Account } from './account';
import { secretbox, hash, randomBytes } from 'tweetnacl';
import { Bs58 } from './utils/bs58';
import { KeyPairPermission } from './data/params';

const _password2key = (password: string) => {
  const key = hash(Buffer.from(password)).subarray(0, secretbox.keyLength);
  return key;
};

export interface WalletRequestHandlerInterface {
  requireSign: (
    id: string,
    permission: KeyPairPermission,
    data: Buffer,
  ) => Promise<boolean>;
  requireAddAccount: (account: Account) => Promise<boolean>;
  requireUpdateAccount: (account: Account) => Promise<boolean>;
  requireRemoveAccount: (id: string) => Promise<boolean>;
  requireUpdatePassword: (password: string) => Promise<boolean>;
}

export class WalletRequestHandler implements WalletRequestHandlerInterface {
  constructor(
    readonly requireSign: (
      id: string,
      permission: KeyPairPermission,
      data: Buffer,
    ) => Promise<boolean>,
    readonly requireAddAccount: (account: Account) => Promise<boolean>,
    readonly requireUpdateAccount: (account: Account) => Promise<boolean>,
    readonly requireRemoveAccount: (id: string) => Promise<boolean>,
    readonly requireUpdatePassword: (password: string) => Promise<boolean>,
  ) {}
}

export class Wallet {
  readonly #accounts: Account[] = [];
  #password: string;
  #walletRequestHandler: WalletRequestHandlerInterface;
  get accounts() {
    return this.#accounts.map((acc) => acc.id);
  }
  constructor(
    accounts: Account[],
    password: string,
    walletRequestHandler: WalletRequestHandlerInterface,
  ) {
    for (const account of accounts) {
      this.#addAccount(account);
    }
    this.#password = password;
    this.#walletRequestHandler = walletRequestHandler;
  }
  #sign(id: string, permission: KeyPairPermission, data: Buffer) {
    const account = this.#accounts.find((e) => e.id === id);
    if (!account) {
      throw new Error(`account not found ${id}`);
    }
    return account.sign(permission, data);
  }
  #addAccount(account: Account) {
    const index = this.#accounts.findIndex((e) => e.id === account.id);
    if (index !== -1) {
      throw new Error(`account already exits ${account.id}`);
    }
    this.#accounts.push(Account.parse(account.toString()));
  }
  #updateAccount(account: Account) {
    const index = this.#accounts.findIndex((e) => e.id === account.id);
    if (index === -1) {
      throw new Error(`account not found ${account.id}`);
    }
    this.#accounts[index] = Account.parse(account.toString());
  }
  #removeAccount(id: string) {
    const index = this.#accounts.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`account not found ${id}`);
    }
    this.#accounts.splice(index, 1);
  }
  #updatePassword(password: string) {
    this.#password = password;
  }
  async sign(id: string, permission: KeyPairPermission, data: Buffer) {
    const auth = await this.#walletRequestHandler.requireSign(
      id,
      permission,
      data,
    );
    if (auth) {
      return this.#sign(id, permission, data);
    }
  }
  async addAccount(account: Account) {
    const auth = await this.#walletRequestHandler.requireAddAccount(account);
    if (auth) {
      return this.#addAccount(account);
    }
  }
  async updateAccount(account: Account) {
    const auth = await this.#walletRequestHandler.requireUpdateAccount(account);
    if (auth) {
      return this.#updateAccount(account);
    }
  }
  async removeAccount(id: string) {
    const auth = await this.#walletRequestHandler.requireRemoveAccount(id);
    if (auth) {
      return this.#removeAccount(id);
    }
  }
  async updatePassword(password: string) {
    const auth = await this.#walletRequestHandler.requireUpdatePassword(
      password,
    );
    if (auth) {
      return this.#updatePassword(password);
    }
  }
  verify(
    id: string,
    permission: KeyPairPermission,
    data: Buffer,
    signature: Buffer,
  ) {
    const index = this.#accounts.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`account not found ${id}`);
    }
    const account = this.#accounts[index];
    return account.verify(permission, data, signature);
  }
  toString(): string {
    const nonce = randomBytes(secretbox.nonceLength);
    const key = _password2key(this.#password);
    const accounts = this.#accounts.map((acc) => acc.toString());
    const str = JSON.stringify(accounts);
    const box = secretbox(Buffer.from(str, 'utf-8'), nonce, key);
    const nonceBs58 = Bs58.encode(Buffer.from(nonce));
    const boxBs58 = Bs58.encode(Buffer.from(box));
    return `${nonceBs58}:${boxBs58}`;
  }
  static connect() {
    return window['iwallet'] ? (window['iwallet'] as Wallet) : null;
  }
  static parse(
    data: string,
    password: string,
    auth: WalletRequestHandlerInterface,
  ) {
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
      password,
      auth,
    );
    return wallet;
  }
}
