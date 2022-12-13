import { OfficialContract } from './official-contract';
export declare class ExchangeContract extends OfficialContract {
    get id(): string;
    transfer(symbol: string, to: string, amount: string, memo: string): void;
    createAccountAndTransfer(id: string, amount: string, ownerKey: string, activeKey: string): void;
}
