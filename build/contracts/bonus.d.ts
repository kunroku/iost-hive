import { OfficialContract } from './official-contract';
export declare class BonusContract extends OfficialContract {
    get id(): string;
    issueContribute(parent: string): void;
    exchangeIOST(account: string, amount: string): void;
}
