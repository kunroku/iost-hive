import { RPC } from '../api';
export declare class ContractStorage {
    #private;
    constructor(id: string, rpc: RPC);
    get(key: string): Promise<import("../data/rpc-resopnse").ContractStorage>;
    mapGet(key: string, field: string): Promise<import("../data/rpc-resopnse").ContractStorage>;
    mapKeys(key: string): Promise<import("../data/rpc-resopnse").ContractStorageFields>;
    batchGet(keyFields: {
        key: string;
        field: string;
    }[]): Promise<import("../data/rpc-resopnse").ContractStorages[]>;
}
