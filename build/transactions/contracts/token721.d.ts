import { AbstractContractTransaction } from './contract';
export declare class Token721 extends AbstractContractTransaction {
    readonly id = "token721.iost";
    create(tokenSymbol: string, issuer: string, totalSupply: number): void;
    issue(tokenSymbol: string, to: string, metadata: string): void;
    transfer(tokenSymbol: string, from: string, to: string, tokenId: string, memo: string): void;
    destroy(tokenSymbol: string, from: string, amount: string): void;
}
