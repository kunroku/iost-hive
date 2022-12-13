import { AbstractContractTransaction } from './abstract-contract';
export type TokenCreateConfig = {
    decimal: number;
    canTransfer: boolean;
    fullName: string;
};
export declare class TokenContractTransaction extends AbstractContractTransaction {
    readonly id = "token.iost";
    create(symbol: string, issuer: string, totalSupply: number, config: TokenCreateConfig): void;
    issue(symbol: string, to: string, amount: string): void;
    transfer(symbol: string, from: string, to: string, amount: string, memo: string): void;
    transferFreeze(symbol: string, from: string, to: string, amount: string, freezeTime: string, memo: string): void;
    destroy(symbol: string, from: string, amount: string): void;
}
