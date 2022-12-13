import { OfficialContract } from './official-contract';
export declare class BonusContract extends OfficialContract {
    readonly id = "bonus.iost";
    issueContribute(parent: string): void;
    exchangeIOST(account: string, amount: string): void;
}
