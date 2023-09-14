import { ContractABI } from '../utils/contract-abi';
import { OfficialContract } from './official-contract';
export declare class SystemContract extends OfficialContract {
    get id(): string;
    setCode(source: string, abi: ContractABI): void;
    updateCode(source: string, abi: ContractABI, contractId: string): void;
    cancelDelaytx(hash: string): void;
    receipt(data: string): void;
}
