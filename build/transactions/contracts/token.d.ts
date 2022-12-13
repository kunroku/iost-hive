import { AbstractContractTransaction } from './contract';
export type TokenCreateConfig = {
    decimal: number;
    canTransfer: boolean;
    fullName: string;
};
export declare class TokenContractTransaction extends AbstractContractTransaction {
    readonly id = "token.iost";
    create(tokenSymbol: string, issuer: string, totalSupply: number, config: TokenCreateConfig): void;
    issue(tokenSymbol: string, to: string, amount: string): void;
    transfer(tokenSymbol: string, from: string, to: string, amount: string, memo: string): void;
    transferFreeze(tokenSymbol: string, from: string, to: string, amount: string, freezeTime: string, memo: string): void;
    destroy(tokenSymbol: string, from: string, amount: string): void;
}
