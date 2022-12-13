import { AbstractContractTransaction } from './abstract-contract';
export declare class Token721ContractTransaction extends AbstractContractTransaction {
    readonly id = "token721.iost";
    create(symbol: string, issuer: string, totalSupply: number): void;
    issue(symbol: string, to: string, metadata: string): void;
    transfer(symbol: string, from: string, to: string, tokenId: string, memo: string): void;
    destroy(symbol: string, from: string, amount: string): void;
}
