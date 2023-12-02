import { RPC } from '../api';
import { TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';
import { ContractStorage } from './contract-storage';
export declare abstract class ContractInterface {
    #private;
    protected abstract readonly id: string;
    constructor(tx: Transaction);
    protected _call(abi: string, args: TransactionArgumentType[]): void;
    _storage(rpc: RPC): ContractStorage;
}
