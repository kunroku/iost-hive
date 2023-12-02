import { RPC } from '../api';

export class ContractStorage {
  #id: string;
  #rpc: RPC;
  constructor(id: string, rpc: RPC) {
    this.#id = id;
    this.#rpc = rpc;
  }
  async get(key: string) {
    return await this.#rpc.getContractStorage(this.#id, key, null);
  }
  async mapGet(key: string, field: string) {
    return await this.#rpc.getContractStorage(this.#id, key, field);
  }
  async mapKeys(key: string) {
    return await this.#rpc.getContractStorageFields(this.#id, key);
  }
  async batchGet(keyFields: { key: string; field: string }[]) {
    return await this.#rpc.getBatchContractStorage(this.#id, keyFields);
  }
}
