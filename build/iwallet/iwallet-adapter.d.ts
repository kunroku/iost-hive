import { IOSTConfig, TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';
import { AbstractAccountAdapter, AbstractHTTPProviderAdapter, AbstractIOSTAdapter, AbstractRPCAdapter, Callback } from './iwallet-extension';
export declare class AccountAdapter extends AbstractAccountAdapter {
    get network(): import("../data/params").Network;
}
export declare class HTTPProviderAdapter extends AbstractHTTPProviderAdapter {
}
export declare class RPCAdapter extends AbstractRPCAdapter {
    readonly _provider: HTTPProviderAdapter;
    constructor(_provider: HTTPProviderAdapter);
}
export type IWalletSignAndSend = (tx: Transaction) => Callback;
export type IWalletSignMessage = (message: string) => Callback;
export type IOSTAdapterConfig = {
    gasPrice: number;
    gasLimit: number;
    delay: number;
};
export declare class IOSTAdapter extends AbstractIOSTAdapter implements IOSTConfig {
    signAndSend: IWalletSignAndSend;
    signMessage: IWalletSignMessage;
    rpc: RPCAdapter;
    account: AccountAdapter;
    get network(): import("../data/params").Network;
    get chainId(): 1020 | 0 | 1023 | 1024;
    get host(): string;
    setRPC(rpc: RPCAdapter): void;
    get currentRPC(): RPCAdapter;
    setAccount(account: AccountAdapter): void;
    callABI(contract: string, abi: string, args: TransactionArgumentType[]): any;
}
