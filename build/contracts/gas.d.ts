import { ContractInterface } from './contract-interface';
export declare class GASContract extends ContractInterface {
    get id(): string;
    pledge(pledgor: string, to: string, amount: string): void;
    unpledge(pledgor: string, from: string, amount: string): void;
}
