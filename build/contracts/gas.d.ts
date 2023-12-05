import { ContractInterface } from './contract-interface';
export declare class GASContract extends ContractInterface {
    get id(): string;
    pledge(pledger: string, to: string, amount: string): void;
    unpledge(pledger: string, from: string, amount: string): void;
}
