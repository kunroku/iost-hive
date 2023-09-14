import { ContractInterface } from './contract-interface';
export declare class RAMContract extends ContractInterface {
    get id(): string;
    buy(payer: string, receiver: string, amount: string): void;
    sell(seller: string, receiver: string, amount: string): void;
    lend(from: string, to: string, amount: string): void;
}
