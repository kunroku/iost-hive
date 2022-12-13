import { TransactionArgumentType } from '../../data/params';
import { Transaction } from '../tx';
export declare abstract class AbstractContractTransaction {
    private readonly _tx;
    protected abstract readonly id: string;
    constructor(_tx: Transaction);
    protected call(abi: string, args: TransactionArgumentType[]): void;
}
