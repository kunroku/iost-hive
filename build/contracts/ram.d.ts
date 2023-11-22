import { ContractInterface } from './contract-interface';
export declare class RAMContract extends ContractInterface {
    get id(): string;
    buy(payer: string, receiver: string, amount: number): void;
    sell(seller: string, receiver: string, amount: number): void;
    lend(from: string, to: string, amount: number): void;
}
