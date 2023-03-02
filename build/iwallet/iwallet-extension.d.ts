import { Network, TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';
import { IOSTAdapterConfig } from './iwallet-adapter';
export declare abstract class AbstractAccountAdapter {
    readonly _id: string;
    abstract network: Network;
    get name(): string;
    constructor(_id: string);
}
export declare abstract class AbstractHTTPProviderAdapter {
    readonly _host: string;
    constructor(_host: string);
}
export declare abstract class AbstractRPCAdapter {
    readonly _provider: AbstractHTTPProviderAdapter;
    constructor(_provider: AbstractHTTPProviderAdapter);
}
export interface Callback {
    on: (msg: string, func: (res: any) => void) => Callback;
}
export declare abstract class AbstractIOSTAdapter {
    readonly config: IOSTAdapterConfig;
    constructor(config: IOSTAdapterConfig);
    abstract signAndSend: (tx: Transaction) => Callback;
    abstract signMessage: (message: string) => Callback;
    abstract rpc: AbstractRPCAdapter;
    abstract account: AbstractAccountAdapter;
    abstract setRPC(rpc: AbstractRPCAdapter): void;
    abstract currentRPC: AbstractRPCAdapter;
    abstract setAccount(account: AbstractAccountAdapter): void;
    abstract callABI(contract: string, abi: string, args: TransactionArgumentType[]): any;
}
export type IWalletAdapterPackType = {
    IOST: typeof AbstractIOSTAdapter;
    HTTPProvider: typeof AbstractHTTPProviderAdapter;
    RPC: typeof AbstractRPCAdapter;
    Account: typeof AbstractAccountAdapter;
};
export type IWalletExtension = {
    account: AbstractAccountAdapter;
    enable: () => Promise<string>;
    IOST: AbstractIOSTAdapter;
    network: Network;
    newIOST: (pack: IWalletAdapterPackType) => AbstractIOSTAdapter;
    rpc: AbstractRPCAdapter;
    setAccount: (param: AbstractAccountAdapter) => void;
};
export declare const getIwalletJS: () => IWalletExtension;
