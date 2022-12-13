import { AbstractContractTransaction } from './contract';
export declare class RAMContractTransaction extends AbstractContractTransaction {
    readonly id = "ram.iost";
    buy(payer: string, receiver: string, amount: string): void;
    sell(seller: string, receiver: string, amount: string): void;
    lend(from: string, to: string, amount: string): void;
}
