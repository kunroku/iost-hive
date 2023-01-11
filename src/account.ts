import { AbstractKeyPair, KeyPair, KeyPairJSON } from './kp';
import { KeyPairPermission } from './data/params';
import { Bs58 } from './utils/bs58';

export type AccountJSON = {
  id: string;
  auth: {
    active: KeyPairJSON[];
    owner: KeyPairJSON[];
  };
};

export class Account {
  readonly #auth: {
    active: AbstractKeyPair[];
    owner: AbstractKeyPair[];
  };
  readonly #id: string;
  get id() {
    return this.#id;
  }
  constructor(id: string) {
    this.#auth = {
      active: [],
      owner: [],
    };
    this.#id = id;
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
      id: this.id,
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
    const { id, auth } = JSON.parse(data) as AccountJSON;
    const account = new Account(id);
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
