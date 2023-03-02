import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { ReadStream } from 'tty';
import { HTTPProvider } from './http-provider';
import {
  NodeInfo,
  ChainInfo,
  BlockInfo,
  TokenInfo,
  AccountInfo,
  RAMInfo,
} from '../data/info';
import { TxInfo, TxReceiptInfo } from '../data/info';
import { Transaction } from '../transaction/transaction';
import { RPCResponse, Params } from '../data';
import { RPCAdapter } from '../iwallet/iwallet-adapter';

export class RPC extends RPCAdapter {
  public readonly _provider: HTTPProvider;
  constructor(provider: HTTPProvider) {
    super(provider);
  }
  async getNodeInfo() {
    const url = 'getNodeInfo';
    return await this._provider.get<NodeInfo>(url);
  }
  async getChainInfo() {
    const url = 'getChainInfo';
    return await this._provider.get<ChainInfo>(url);
  }
  async getGasRatio() {
    const url = 'getGasRatio';
    return await this._provider.get<RPCResponse.GasRation>(url);
  }
  async getRAMInfo() {
    const url = 'getRAMInfo';
    return await this._provider.get<RAMInfo>(url);
  }
  async getTxByHash(hash: string) {
    const url = `getTxByHash/${hash}`;
    return await this._provider.get<TxInfo>(url);
  }
  async getTxReceiptByTxHash(hash: string) {
    const url = `getTxReceiptByTxHash/${hash}`;
    return await this._provider.get<TxReceiptInfo>(url);
  }
  async getBlockByHash(hash: string) {
    const url = `getBlockByHash/${hash}/true`;
    return await this._provider.get<BlockInfo>(url);
  }
  async getBlockByNumber(num: number) {
    const url = `getBlockByNumber/${num}/true`;
    return await this._provider.get<BlockInfo>(url);
  }
  async getAccount(id: string, byLongestChain = true) {
    const url = `getAccount/${id}/${byLongestChain}`;
    return await this._provider.get<AccountInfo>(url);
  }
  async getBalance(address: string, symbol = 'iost', byLongestChain = true) {
    const url = `getTokenBalance/${address}/${symbol}/${byLongestChain}`;
    return await this._provider.get<RPCResponse.TokenBalance>(url);
  }
  async getProducerVoteInfo(id: string, byLongestChain = true) {
    const url = `getProducerVoteInfo/${id}/${byLongestChain}`;
    return await this._provider.get<RPCResponse.Contract>(url);
  }
  async getContract(id: string, byLongestChain = true) {
    const url = `getContract/${id}/${byLongestChain}`;
    return await this._provider.get<RPCResponse.Contract>(url);
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
    return await this._provider.post<RPCResponse.ContractStorage>(url, data);
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
    return await this._provider.post<RPCResponse.ContractStorageFields>(
      url,
      data,
    );
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
      chunkedQuery.map((query) =>
        this._provider.post<RPCResponse.ContractStorages>(url, query),
      ),
    );
    return res;
  }
  async sendTx(tx: Transaction) {
    const url = 'sendTx';
    return await this._provider.post<RPCResponse.TransactionPending>(
      url,
      tx.toString(),
    );
  }
  async execTx(tx: Transaction) {
    const url = 'execTx';
    return await this._provider.post<TxReceiptInfo>(url, tx.toString());
  }
  subscribe(topics: Params.SubscribeEventType[], contract: string) {
    const url = 'subscribe';
    const data = {
      topics,
      filter: { contract_id: contract },
    };
    const event: StrictEventEmitter<EventEmitter, Params.SubscribeEvent> =
      new EventEmitter();
    this._provider.stream<ReadStream>(url, data).then(async (readable) => {
      for await (const chunk of readable) {
        const messages: Params.Subscribe[] = Buffer.from(chunk)
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
    return await this._provider.get<RPCResponse.CandidateBonus>(url);
  }
  async getVoterBonus(name: string, byLongestChain = true) {
    const url = `getVoterBonus/${name}/${byLongestChain}`;
    return await this._provider.get<RPCResponse.VoterBonus>(url);
  }
  async getTokenInfo(symbol: string, byLongestChain = true) {
    const url = `getTokenInfo/${symbol}/${byLongestChain}`;
    return await this._provider.get<TokenInfo>(url);
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
    return await this._provider.post<RPCResponse.ContractStorageList>(url, {
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
    return await this._provider.post<RPCResponse.ContractStorageList>(url, {
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
    return await this._provider.post<RPCResponse.ContractStorageList>(url, {
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
    return await this._provider.post<RPCResponse.ContractStorageList>(url, {
      id: contract,
      limit,
      from: range.from,
      to: range.to,
      storageType: 'MAP',
      by_longest_cahin: byLongestChain,
    });
  }
}
