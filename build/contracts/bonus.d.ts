import { ContractInterface } from './contract-interface';
export declare class BonusContract extends ContractInterface {
    get id(): string;
    issueContribute(parent: string): void;
    exchangeIOST(account: string, amount: string): void;
}
