import { AbstractContractTransaction } from './abstract-contract';
export declare class GASContractTransaction extends AbstractContractTransaction {
    readonly id = "gas.iost";
    pledge(pledgor: string, to: string, amount: string): void;
    unpledge(pledgor: string, from: string, amount: string): void;
}
