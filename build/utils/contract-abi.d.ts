import { AmountLimit } from '../data/params';
export type ABIArgsTypes = 'string' | 'number' | 'bool' | 'json';
export declare class ContractABI {
    lang: string;
    version: string;
    abi: {
        name: string;
        args: ABIArgsTypes[];
        amountLimit: AmountLimit[];
    }[];
    constructor(lang: string, version: string, abi: {
        name: string;
        args: ABIArgsTypes[];
        amountLimit: AmountLimit[];
    }[]);
    static compile(source: string): ContractABI;
}
