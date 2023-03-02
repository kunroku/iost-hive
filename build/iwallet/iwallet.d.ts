/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { Account } from '../account';
import { TxReceiptInfo } from '../data/info';
import { IOSTConfig } from '../data/params';
import { Transaction } from '../transaction/transaction';
import { AccountAdapter } from './iwallet-adapter';
import { IWalletAdapterPackType } from './iwallet-extension';
export type IWalletSignature = {
    algorithm: string;
    public_key: string;
    signature: string;
    message: string;
};
export type IWalletTransactionEvents = {
    pending: (tx_hash: string) => void;
    success: (res: TxReceiptInfo) => void;
    failed: (error: {
        message: string;
    }) => void;
};
export type IWalletSignEvents = {
    success: (res: IWalletSignature) => void;
    failed: (error: {
        message: string;
    }) => void;
};
export declare const IWALLET_ADAPTER_PACK: IWalletAdapterPackType;
export declare class IWallet implements IOSTConfig {
    #private;
    get host(): string;
    get chainId(): 1024 | 0 | 1020 | 1023;
    get account(): AccountAdapter;
    set account(account: AccountAdapter);
    private constructor();
    static connect(): Promise<IWallet>;
    signAndSend(tx: Transaction): StrictEventEmitter<EventEmitter, IWalletTransactionEvents, IWalletTransactionEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    signAndSendAsync(tx: Transaction): Promise<TxReceiptInfo>;
    signMessage(message: string): StrictEventEmitter<EventEmitter, IWalletSignEvents, IWalletSignEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    signMessageAsync(message: string): Promise<IWalletSignature>;
    setAccount(account: Account): void;
}
