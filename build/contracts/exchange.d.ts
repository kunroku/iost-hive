import { ContractInterface } from './contract-interface';
export declare class ExchangeContract extends ContractInterface {
    get id(): string;
    transfer(symbol: string, to: string, amount: string, memo: string): void;
    createAccountAndTransfer(id: string, amount: string, ownerKey: string, activeKey: string): void;
}
