/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { ChainInfo, BlockInfo, TokenInfo, AccountInfo } from '../data/info';
import { AmountLimit } from '../data/params';
import { AbstractRPC } from './abstract-rpc';
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
export declare class BlockchainRPC extends AbstractRPC {
    getChainInfo(): Promise<ChainInfo>;
    getBlockByHash(hash: string): Promise<BlockInfo>;
    getBlockByNumber(num: number): Promise<BlockInfo>;
    getBalance(address: string, symbol?: string, byLongestChain?: boolean): Promise<TokenBalance>;
    getTokenInfo(symbol: string, byLongestChain?: boolean): Promise<TokenInfo>;
    getToken721Balance(address: string, symbol: string, byLongestChain?: boolean): Promise<Token721Balance>;
    getToken721Metadata(symbol: string, tokenID: string, byLongestChain?: boolean): Promise<Token721Metadata>;
    getToken721Owner(symbol: string, tokenID: string, byLongestChain?: boolean): Promise<Token721Owner>;
    getContract(id: string, byLongestChain?: boolean): Promise<Contract>;
    getContractStorage(id: string, key: string, field: string | null, byLongestChain?: boolean): Promise<ContractStorage>;
    getContractStorageFields(id: string, key: string, byLongestChain?: boolean): Promise<ContractStorageFields>;
    getBatchContractStorage(id: string, keyFields: {
        key: string;
        fielod: string;
    }[], byLongestChain?: boolean): Promise<ContractStorages[]>;
    getAccountInfo(id: string, reversible?: boolean): Promise<AccountInfo>;
    subscribe(topics: SubscribeEventType[], contract: string): StrictEventEmitter<EventEmitter, SubscribeEvent, SubscribeEvent, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    subscribeAsync(topics: SubscribeEventType[], contract: string, onSubscribe: (messages: Subscribe[]) => Promise<boolean>): Promise<Subscribe[][]>;
}
