import { AbstractKeyPair, KeyPair, KeyPairJSON } from './kp';
import { KeyPairPermission } from './data/params';
import { Bs58 } from './utils/bs58';
import { AccountAdapter } from './iwallet/iwallet-adapter';

export type AccountJSON = {
  name: string;
  auth: {
    active: KeyPairJSON[];
    owner: KeyPairJSON[];
  };
};

export class Account extends AccountAdapter {
  readonly #auth: {
    active: AbstractKeyPair[];
    owner: AbstractKeyPair[];
  };
  constructor(name: string) {
    super(name);
    this.#auth = {
      active: [],
      owner: [],
    };
  }
  addKeyPair(permission: KeyPairPermission, keyPair: AbstractKeyPair) {
    this.#auth[permission].push(keyPair);
    return this;
  }
  sign(permission: KeyPairPermission, data: Buffer) {
    return this.#auth[permission].map((kp) => kp.sign(data));
  }
  verify(permission: KeyPairPermission, data: Buffer, signature: Buffer) {
    for (const kp of this.#auth[permission]) {
      const isSignatureValid = kp.verify(data, signature);
      if (isSignatureValid) {
        return true;
      }
    }
    return false;
  }
  toJSON() {
    const json: AccountJSON = {
      name: this.name,
      auth: { active: [], owner: [] },
    };
    for (const keyPair of this.#auth.active) {
      json.auth.active.push(keyPair.toJSON());
    }
    for (const keyPair of this.#auth.owner) {
      json.auth.owner.push(keyPair.toJSON());
    }
    return json;
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  static parse(data: string) {
    const { name, auth } = JSON.parse(data) as AccountJSON;
    const account = new Account(name);
    for (const permission of ['active', 'owner'] as KeyPairPermission[]) {
      for (const key of auth[permission]) {
        const kp = new KeyPair(
          key.type,
          Bs58.decode(key.pubkey),
          key.seckey && Bs58.decode(key.seckey),
        );
        account.addKeyPair(permission, kp);
      }
    }
    return account;
  }
}
