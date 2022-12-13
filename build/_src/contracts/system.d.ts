import { TransactionArgumentType } from '../data/params';
import { OfficialContract } from './official-contract';
export declare class SystemContract extends OfficialContract {
    get id(): string;
    setCode(source: string, abi: TransactionArgumentType): void;
    updateCode(source: string, abi: TransactionArgumentType, contractId: string): void;
    cancelDelaytx(hash: string): void;
    receipt(data: string): void;
}
