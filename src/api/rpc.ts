import axios, { AxiosRequestConfig } from 'axios';
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { ReadStream } from 'tty';
import {
  NodeInfo,
  ChainInfo,
  BlockInfo,
  TokenInfo,
  AccountInfo,
  RAMInfo,
} from '../data/info';
import { AmountLimit } from '../data/params';
import { TxInfo, TxReceiptInfo } from '../data/info';
import { Transaction } from '../transaction/transaction';

export type TransactionPending = {
  hash: string;
  pre_tx_receipt: TxReceiptInfo | null;
};
export type TokenBalance = {
  balance: number;
  frozen_balances: {
    amount: number;
    time: string;
  }[];
};
export type Token721Balance = {
  balance: string;
  tokenIDs: string[];
};
export type Token721Metadata = {
  metadata: string;
};
export type Token721Owner = {
  owner: string;
};
export type Contract = {
  id: string;
  code: string;
  language: string;
  version: string;
  abis: {
    name: string;
    args: string[];
    amount_limit: AmountLimit[];
  }[];
};
export type ContractStorage = {
  data: string;
  block_hash: string;
  block_number: string;
};
export type ContractStorageFields = {
  fields: string[];
  block_hash: string;
  block_number: string;
};
export type ContractStorages = {
  datas: string[];
  block_hash: string;
  block_number: string;
};
export type ContractStorageList = {
  datas: { key: string; value: string }[];
  block_hash: string;
  block_number: string;
};

export type SubscribeEventType = 'CONTRACT_EVENT' | 'CONTRACT_RECEIPT';
export type SubscribeEvent = {
  messages: (messages: Subscribe[]) => void;
};
export type Subscribe = {
  result: {
    event: {
      topic: SubscribeEventType;
      data: string;
      time: string;
    };
  };
};
export type GasRation = {
  lowest_gas_ratio: number;
  median_gas_ratio: number;
};
export type CandidateBonus = {
  bonus: string;
};
export type VoterBonus = {
  bonus: number;
  detail: {
    dapppub: number;
    iostamerica: number;
    laomao: number;
    metanyx: number;
    sutler: number;
    tokenpocket: number;
  };
};

export class RPC {
  readonly #host: string;
  constructor(host: string) {
    this.#host = host;
  }
  async #get<ResponseType>(url: string) {
    try {
      const res = await axios<ResponseType>({
        method: 'get',
        baseURL: this.#host,
        url,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
  async #post<ResponseType>(url: string, data: AxiosRequestConfig['data']) {
    try {
      const res = await axios<ResponseType>({
        method: 'post',
        baseURL: this.#host,
        url,
        data,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
  async #stream<ResponseType>(url: string, data: any) {
    try {
      const res = await axios<ResponseType>({
        method: 'post',
        baseURL: this.#host,
        url,
        data,
        headers: {
          'Content-Type': 'text/plain',
        },
        responseType: 'stream',
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`${JSON.stringify(error.response.data)}`);
      } else {
        throw new Error(error.message);
      }
    }
  }
  async getNodeInfo() {
    const url = 'getNodeInfo';
    return await this.#get<NodeInfo>(url);
  }
  async getChainInfo() {
    const url = 'getChainInfo';
    return await this.#get<ChainInfo>(url);
  }
  async getGasRatio() {
    const url = 'getGasRatio';
    return await this.#get<GasRation>(url);
  }
  async getRAMInfo() {
    const url = 'getRAMInfo';
    return await this.#get<RAMInfo>(url);
  }
  async getTxByHash(hash: string) {
    const url = `getTxByHash/${hash}`;
    return await this.#get<TxInfo>(url);
  }
  async getTxReceiptByTxHash(hash: string) {
    const url = `getTxReceiptByTxHash/${hash}`;
    return await this.#get<TxReceiptInfo>(url);
  }
  async getBlockByHash(hash: string) {
    const url = `getBlockByHash/${hash}/true`;
    return await this.#get<BlockInfo>(url);
  }
  async getBlockByNumber(num: number) {
    const url = `getBlockByNumber/${num}/true`;
    return await this.#get<BlockInfo>(url);
  }
  async getAccount(id: string, byLongestChain = true) {
    const url = `getAccount/${id}/${byLongestChain}`;
    return await this.#get<AccountInfo>(url);
  }
  async getBalance(address: string, symbol = 'iost', byLongestChain = true) {
    const url = `getTokenBalance/${address}/${symbol}/${byLongestChain}`;
    return await this.#get<TokenBalance>(url);
  }
  async getProducerVoteInfo(id: string, byLongestChain = true) {
    const url = `getProducerVoteInfo/${id}/${byLongestChain}`;
    return await this.#get<Contract>(url);
  }
  async getContract(id: string, byLongestChain = true) {
    const url = `getContract/${id}/${byLongestChain}`;
    return await this.#get<Contract>(url);
  }
  async getContractStorage(
    id: string,
    key: string,
    field: string | null,
    byLongestChain = true,
  ) {
    const url = 'getContractStorage';
    const data = {
      id,
      key,
      field: field || '',
      by_longest_chain: byLongestChain,
    };
    return await this.#post<ContractStorage>(url, data);
  }
  async getContractStorageFields(
    id: string,
    key: string,
    byLongestChain = true,
  ) {
    const url = 'getContractStorageFields';
    const data = {
      id,
      key,
      by_longest_chain: byLongestChain,
    };
    return await this.#post<ContractStorageFields>(url, data);
  }
  async getBatchContractStorage(
    id: string,
    keyFields: { key: string; field: string }[],
    byLongestChain = true,
  ) {
    const chunkedQuery: {
      id: string;
      key_fields: { key: string; field: string }[];
      by_longest_chain: boolean;
    }[] = [];
    for (let i = 0; i < keyFields.length; i++) {
      if (i % 50 === 0) {
        chunkedQuery.push({
          id,
          key_fields: [],
          by_longest_chain: byLongestChain,
        });
      }
      chunkedQuery[chunkedQuery.length - 1].key_fields.push(keyFields[i]);
    }
    const url = 'getBatchContractStorage';
    const res = await Promise.all(
      chunkedQuery.map((query) => this.#post<ContractStorages>(url, query)),
    );
    return res;
  }
  async sendTx(tx: Transaction) {
    const url = 'sendTx';
    return await this.#post<TransactionPending>(url, tx.toString());
  }
  async execTx(tx: Transaction) {
    const url = 'execTx';
    return await this.#post<TxReceiptInfo>(url, tx.toString());
  }
  subscribe(topics: SubscribeEventType[], contract: string) {
    const url = 'subscribe';
    const data = {
      topics,
      filter: { contract_id: contract },
    };
    const event: StrictEventEmitter<EventEmitter, SubscribeEvent> =
      new EventEmitter();
    this.#stream<ReadStream>(url, data).then(async (readable) => {
      for await (const chunk of readable) {
        const messages: Subscribe[] = Buffer.from(chunk)
          .toString('utf-8')
          .split('\n')
          .filter((data) => data !== '')
          .map((e) => JSON.parse(e));
        event.emit('messages', messages);
      }
    });
    return event;
  }
  async getCandidateBonus(name: string, byLongestChain = true) {
    const url = `getCandidateBonus/${name}/${byLongestChain}`;
    return await this.#get<CandidateBonus>(url);
  }
  async getVoterBonus(name: string, byLongestChain = true) {
    const url = `getVoterBonus/${name}/${byLongestChain}`;
    return await this.#get<VoterBonus>(url);
  }
  async getTokenInfo(symbol: string, byLongestChain = true) {
    const url = `getTokenInfo/${symbol}/${byLongestChain}`;
    return await this.#get<TokenInfo>(url);
  }
  /* 非公式API */
  // async getToken721Balance(
  //   address: string,
  //   symbol: string,
  //   byLongestChain = true,
  // ) {
  //   const url = `getToken721Balance/${address}/${symbol}/${byLongestChain}`;
  //   return await this._get<Token721Balance>(url);
  // }
  // async getToken721Metadata(
  //   symbol: string,
  //   tokenID: string,
  //   byLongestChain = true,
  // ) {
  //   const url = `getToken721Metadata/${symbol}/${tokenID}/${byLongestChain}`;
  //   return await this._get<Token721Metadata>(url);
  // }
  // async getToken721Owner(
  //   symbol: string,
  //   tokenID: string,
  //   byLongestChain = true,
  // ) {
  //   const url = `getToken721Owner/${symbol}/${tokenID}/${byLongestChain}`;
  //   return await this._get<Token721Owner>(url);
  // }
  async listContractStorage(
    contract: string,
    limit = 100,
    byLongestChain = true,
  ) {
    const url = `listContractStorage`;
    return await this.#post<ContractStorageList>(url, {
      id: contract,
      limit,
      by_longest_cahin: byLongestChain,
    });
  }
  async listContractStorageMap(
    contract: string,
    limit = 100,
    byLongestChain = true,
  ) {
    const url = `listContractStorage`;
    return await this.#post<ContractStorageList>(url, {
      id: contract,
      limit,
      storageType: 'MAP',
      by_longest_cahin: byLongestChain,
    });
  }
  async listContractStorageMapByPrefix(
    contract: string,
    prefix: string,
    limit = 100,
    byLongestChain = true,
  ) {
    const url = `listContractStorage`;
    return await this.#post<ContractStorageList>(url, {
      id: contract,
      limit,
      prefix,
      storageType: 'MAP',
      by_longest_cahin: byLongestChain,
    });
  }
  async listContractStorageMapByRange(
    contract: string,
    range: { from?: string; to?: string },
    limit = 100,
    byLongestChain = true,
  ) {
    const url = `listContractStorage`;
    return await this.#post<ContractStorageList>(url, {
      id: contract,
      limit,
      from: range.from,
      to: range.to,
      storageType: 'MAP',
      by_longest_cahin: byLongestChain,
    });
  }
}
