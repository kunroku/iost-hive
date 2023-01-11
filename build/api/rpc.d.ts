/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { NodeInfo, ChainInfo, BlockInfo, TokenInfo, AccountInfo, RAMInfo } from '../data/info';
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
    datas: {
        key: string;
        value: string;
    }[];
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
export declare class RPC {
    #private;
    constructor(host: string);
    getNodeInfo(): Promise<NodeInfo>;
    getChainInfo(): Promise<ChainInfo>;
    getGasRatio(): Promise<GasRation>;
    getRAMInfo(): Promise<RAMInfo>;
    getTxByHash(hash: string): Promise<TxInfo>;
    getTxReceiptByTxHash(hash: string): Promise<TxReceiptInfo>;
    getBlockByHash(hash: string): Promise<BlockInfo>;
    getBlockByNumber(num: number): Promise<BlockInfo>;
    getAccount(id: string, byLongestChain?: boolean): Promise<AccountInfo>;
    getBalance(address: string, symbol?: string, byLongestChain?: boolean): Promise<TokenBalance>;
    getProducerVoteInfo(id: string, byLongestChain?: boolean): Promise<Contract>;
    getContract(id: string, byLongestChain?: boolean): Promise<Contract>;
    getContractStorage(id: string, key: string, field: string | null, byLongestChain?: boolean): Promise<ContractStorage>;
    getContractStorageFields(id: string, key: string, byLongestChain?: boolean): Promise<ContractStorageFields>;
    getBatchContractStorage(id: string, keyFields: {
        key: string;
        field: string;
    }[], byLongestChain?: boolean): Promise<ContractStorages[]>;
    sendTx(tx: Transaction): Promise<TransactionPending>;
    execTx(tx: Transaction): Promise<TxReceiptInfo>;
    subscribe(topics: SubscribeEventType[], contract: string): StrictEventEmitter<EventEmitter, SubscribeEvent, SubscribeEvent, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    getCandidateBonus(name: string, byLongestChain?: boolean): Promise<CandidateBonus>;
    getVoterBonus(name: string, byLongestChain?: boolean): Promise<VoterBonus>;
    getTokenInfo(symbol: string, byLongestChain?: boolean): Promise<TokenInfo>;
    listContractStorage(contract: string, limit?: number, byLongestChain?: boolean): Promise<ContractStorageList>;
    listContractStorageMap(contract: string, limit?: number, byLongestChain?: boolean): Promise<ContractStorageList>;
    listContractStorageMapByPrefix(contract: string, prefix: string, limit?: number, byLongestChain?: boolean): Promise<ContractStorageList>;
    listContractStorageMapByRange(contract: string, range: {
        from?: string;
        to?: string;
    }, limit?: number, byLongestChain?: boolean): Promise<ContractStorageList>;
}
