import { TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';
export declare abstract class OfficialContract {
    #private;
    protected abstract readonly id: string;
    constructor(tx: Transaction);
    protected call(abi: string, args: TransactionArgumentType[]): void;
}
