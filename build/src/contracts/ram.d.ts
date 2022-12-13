import { OfficialContract } from './official-contract';
export declare class RAMContract extends OfficialContract {
    readonly id = "ram.iost";
    buy(payer: string, receiver: string, amount: string): void;
    sell(seller: string, receiver: string, amount: string): void;
    lend(from: string, to: string, amount: string): void;
}
