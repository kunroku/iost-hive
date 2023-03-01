/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { RPC } from '../api';
import { TxReceiptInfo } from '../data/info';
import { IOSTConfig } from '../data/params';
import { Transaction } from '../transaction';
export type Network = 'MAINNET' | 'TESTNET' | 'LOCALNET';
export type IWalletAccount = {
    name: string;
    network: Network;
};
type IWalletTransactionEvents = {
    pending: (tx_hash: string) => void;
    success: (res: TxReceiptInfo) => void;
    failed: (error: {
        message: string;
    }) => void;
};
export type IWalletSignature = {
    algorithm: string;
    public_key: string;
    signature: string;
    message: string;
};
type IWalletSignEvents = {
    pending: () => void;
    success: (res: IWalletSignature) => void;
    failed: (error: {
        message: string;
    }) => void;
};
export declare class IWallet implements IOSTConfig {
    #private;
    get host(): string;
    get chainId(): number;
    get account(): IWalletAccount;
    set account(account: IWalletAccount);
    get rpc(): RPC;
    private constructor();
    static connect(): Promise<IWallet>;
    signAndSend(tx: Transaction): StrictEventEmitter<EventEmitter, IWalletTransactionEvents, IWalletTransactionEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    signAndSendAsync(tx: Transaction): Promise<TxReceiptInfo>;
    signMessage(message: string): StrictEventEmitter<EventEmitter, IWalletSignEvents, IWalletSignEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    signMessageAsync(message: string): Promise<IWalletSignature>;
    setAccount(account: IWalletAccount): void;
}
export {};
