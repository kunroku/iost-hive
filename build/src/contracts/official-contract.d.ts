import { TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';
export declare abstract class OfficialContract {
    private readonly _tx;
    protected abstract readonly id: string;
    constructor(_tx: Transaction);
    protected call(abi: string, args: TransactionArgumentType[]): void;
}
