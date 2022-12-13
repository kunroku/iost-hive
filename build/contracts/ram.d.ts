import { OfficialContract } from './official-contract';
export declare class RAMContract extends OfficialContract {
    get id(): string;
    buy(payer: string, receiver: string, amount: string): void;
    sell(seller: string, receiver: string, amount: string): void;
    lend(from: string, to: string, amount: string): void;
}
