import { AbstractKeyPair, KeyPair, KeyPairJSON } from './kp';
import { NetworkConfig, KeyPairPermission } from './data/params';
import { Bs58 } from './utils/bs58';
import { HTTPProvider, RPC } from './api';

export type AccountJSON = {
  name: string;
  auth: {
    active: KeyPairJSON[];
    owner: KeyPairJSON[];
  };
};

export class Account implements AccountJSON {
  name: string;
  auth: {
    active: AbstractKeyPair[];
    owner: AbstractKeyPair[];
  };
  constructor(name: string) {
    this.name = name;
    this.auth = {
      active: [],
      owner: [],
    };
  }
  addKeyPair(permission: KeyPairPermission, keyPair: AbstractKeyPair) {
    this.auth[permission].push(keyPair);
    return this;
  }
  sign(permission: KeyPairPermission, data: Buffer) {
    return this.auth[permission].map((kp) => kp.sign(data));
  }
  verify(permission: KeyPairPermission, data: Buffer, signature: Buffer) {
    for (const kp of this.auth[permission]) {
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
    for (const keyPair of this.auth.active) {
      json.auth.active.push(keyPair.toJSON());
    }
    for (const keyPair of this.auth.owner) {
      json.auth.owner.push(keyPair.toJSON());
    }
    return json;
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  async authorize(network: NetworkConfig) {
    const rpc = new RPC(new HTTPProvider(network.host));
    const info = await rpc.getAccount(this.name);
    const res = {
      active: { weight: 0, threshold: 0, available: false },
      owner: { weight: 0, threshold: 0, available: false },
    };
    for (const kp of this.auth.active) {
      const pubkey = kp.pubkey;
      for (const permission of info.permissions.active.items) {
        if (permission.id === pubkey) {
          res.active.weight += Number(permission.weight);
        }
      }
      res.active.threshold = Number(info.permissions.active.threshold);
    }
    if (res.active.threshold <= res.active.weight) {
      res.active.available = true;
    }
    for (const kp of this.auth.owner) {
      const pubkey = kp.pubkey;
      for (const permission of info.permissions.owner.items) {
        if (permission.id === pubkey) {
          res.owner.weight += Number(permission.weight);
        }
      }
      res.owner.threshold = Number(info.permissions.owner.threshold);
    }
    if (res.owner.threshold <= res.owner.weight) {
      res.owner.available = true;
    }
    return res;
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
