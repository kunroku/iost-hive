import { AmountLimit } from '../data/params';
export type ABIArgsTypes = 'string' | 'number' | 'bool' | 'json';
export type ContractABI = {
    lang: string;
    version: string;
    abi: {
        name: string;
        args: ABIArgsTypes[];
        amountLimit: AmountLimit[];
    }[];
};
export declare const generateContractABI: (source: string) => ContractABI;
