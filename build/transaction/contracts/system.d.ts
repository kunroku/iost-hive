import { TransactionArgumentType } from '../../data/params';
import { AbstractContractTransaction } from './abstract-contract';
export declare class SystemContractTransaction extends AbstractContractTransaction {
    readonly id = "system.iost";
    setCode(source: string, abi: TransactionArgumentType): void;
    updateCode(source: string, abi: TransactionArgumentType, contractId: string): void;
    cancelDelaytx(hash: string): void;
    receipt(data: string): void;
}
