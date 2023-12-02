/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { HTTPProvider } from './http-provider';
import { NodeInfo, ChainInfo, BlockInfo, TokenInfo, AccountInfo, RAMInfo } from '../data/info';
import { TxInfo, TxReceiptInfo } from '../data/info';
import { Transaction } from '../transaction/transaction';
import { RPCResponse, Params } from '../data';
export declare class RPC {
    readonly provider: HTTPProvider;
    constructor(provider: HTTPProvider);
    getNodeInfo(): Promise<NodeInfo>;
    getChainInfo(): Promise<ChainInfo>;
    getGasRatio(): Promise<RPCResponse.GasRation>;
    getRAMInfo(): Promise<RAMInfo>;
    getTxByHash(hash: string): Promise<TxInfo>;
    getTxReceiptByTxHash(hash: string): Promise<TxReceiptInfo>;
    getBlockByHash(hash: string): Promise<BlockInfo>;
    getBlockByNumber(num: number): Promise<BlockInfo>;
    getAccount(id: string, byLongestChain?: boolean): Promise<AccountInfo>;
    getBalance(address: string, symbol?: string, byLongestChain?: boolean): Promise<RPCResponse.TokenBalance>;
    getProducerVoteInfo(id: string, byLongestChain?: boolean): Promise<RPCResponse.Contract>;
    getContract(id: string, byLongestChain?: boolean): Promise<RPCResponse.Contract>;
    getContractStorage(id: string, key: string, field: string | null, byLongestChain?: boolean): Promise<RPCResponse.ContractStorage>;
    getContractStorageFields(id: string, key: string, byLongestChain?: boolean): Promise<RPCResponse.ContractStorageFields>;
    getBatchContractStorage(id: string, keyFields: {
        key: string;
        field: string;
    }[], byLongestChain?: boolean): Promise<RPCResponse.ContractStorages[]>;
    sendTx(tx: Transaction): Promise<RPCResponse.TransactionPending>;
    execTx(tx: Transaction): Promise<TxReceiptInfo>;
    subscribe(topics: Params.SubscribeEventType[], contract: string): StrictEventEmitter<EventEmitter, Params.SubscribeEvent, Params.SubscribeEvent, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    getCandidateBonus(name: string, byLongestChain?: boolean): Promise<RPCResponse.CandidateBonus>;
    getVoterBonus(name: string, byLongestChain?: boolean): Promise<RPCResponse.VoterBonus>;
    getTokenInfo(symbol: string, byLongestChain?: boolean): Promise<TokenInfo>;
    getToken721Balance(address: string, symbol: string, byLongestChain?: boolean): Promise<RPCResponse.Token721Balance>;
    getToken721Metadata(symbol: string, tokenID: string, byLongestChain?: boolean): Promise<RPCResponse.Token721Metadata>;
    getToken721Owner(symbol: string, tokenID: string, byLongestChain?: boolean): Promise<RPCResponse.Token721Owner>;
    listContractStorage(contract: string, limit?: number, byLongestChain?: boolean): Promise<RPCResponse.ContractStorageList>;
    listContractStorageMap(contract: string, limit?: number, byLongestChain?: boolean): Promise<RPCResponse.ContractStorageList>;
    listContractStorageMapByPrefix(contract: string, prefix: string, limit?: number, byLongestChain?: boolean): Promise<RPCResponse.ContractStorageList>;
    listContractStorageMapByRange(contract: string, range: {
        from?: string;
        to?: string;
    }, limit?: number, byLongestChain?: boolean): Promise<RPCResponse.ContractStorageList>;
}
