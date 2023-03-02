import { TxReceiptInfo } from './info';
import { AmountLimit } from './params';
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
