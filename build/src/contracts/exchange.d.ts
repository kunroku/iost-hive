import { OfficialContract } from './official-contract';
export declare class ExchangeContract extends OfficialContract {
    readonly id = "exchange.iost";
    transfer(symbol: string, to: string, amount: string, memo: string): void;
    createAccountAndTransfer(id: string, amount: string, ownerKey: string, activeKey: string): void;
}
