import { TransactionArgumentType } from '../../data/params';
import { Transaction } from '../tx';
import { AuthContractTransaction } from './auth';
import { GASContractTransaction } from './gas';
import { RAMContractTransaction } from './ram';
import { SystemContractTransaction } from './system';
export declare abstract class AbstractContractTransaction {
    readonly tx: Transaction;
    abstract readonly id: string;
    constructor(tx: Transaction);
    protected call(abi: string, args: TransactionArgumentType[]): void;
}
export declare class ContractTransactions {
    readonly tx: Transaction;
    constructor(tx: Transaction);
    readonly auth: AuthContractTransaction;
    readonly gas: GASContractTransaction;
    readonly ram: RAMContractTransaction;
    readonly system: SystemContractTransaction;
}
