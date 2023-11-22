import { ContractABI } from '../utils/contract-abi';
import { ContractInterface } from './contract-interface';
export declare class SystemContract extends ContractInterface {
    get id(): string;
    setCode(source: string, abi: ContractABI): void;
    updateCode(source: string, abi: ContractABI, contractId: string, data: string): void;
    cancelDelaytx(hash: string): void;
    receipt(data: string): void;
}
