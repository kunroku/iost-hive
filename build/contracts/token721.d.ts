import { ContractInterface } from './contract-interface';
export declare class Token721Contract extends ContractInterface {
    get id(): string;
    create(symbol: string, issuer: string, totalSupply: number): void;
    issue(symbol: string, to: string, metadata: string): void;
    transfer(symbol: string, from: string, to: string, tokenId: string, memo: string): void;
    destroy(symbol: string, from: string, amount: string): void;
}
