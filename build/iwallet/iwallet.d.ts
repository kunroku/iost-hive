/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { RPC } from '../api';
import { TxReceiptInfo } from '../data/info';
import { IOST } from '../iost';
import { Transaction } from '../transaction';
export type Network = 'MAINNET' | 'TESTNET' | 'LOCALNET';
declare class Callback {
    on: (msg: string, func: (res: any) => void) => Callback;
}
export type IWalletSignAndSend = (tx: Transaction) => Callback;
export type IWalletSignMessage = (message: string) => Callback;
export type IWalletAccount = {
    name: string;
    network: Network;
};
export type IWalletTransactionEvents = {
    pending: (tx_hash: string) => void;
    success: (res: TxReceiptInfo) => void;
    failed: (error: {
        message: string;
    }) => void;
};
export type IWalletTransactionHandlerStatus = 'pending' | 'success' | 'failed';
export type IWalletSignature = {
    algorithm: string;
    public_key: string;
    signature: string;
    message: string;
};
export type IWalletSignEvents = {
    pending: () => void;
    success: (res: IWalletSignature) => void;
    failed: (error: {
        message: string;
    }) => void;
};
export type IWalletSignHandlerStatus = 'pending' | 'success' | 'failed';
export declare class IWallet {
    #private;
    get iost(): IOST;
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
