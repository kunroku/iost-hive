/// <reference types="node" />
import { RPC } from './api';
import { IOSTConfig, KeyPairPermission } from './data/params';
import { Transaction, TransactionProps } from './transaction/transaction';
import { TransactionHandlerConfig } from './transaction/transaction-handler';
import { Wallet } from './wallet';
import { IWallet } from './iwallet';
export declare class IOST {
    #private;
    get config(): IOSTConfig;
    get serverTimeDiff(): number;
    get iwallet(): IWallet;
    get connected(): boolean;
    get rpc(): RPC;
    constructor(config?: Partial<IOSTConfig>);
    static connect(): Promise<IOST>;
    setServerTimeDiff(): Promise<number>;
    sign(wallet: Wallet, tx: Transaction, publisher: string, signers: {
        id: string;
        permission: KeyPairPermission;
    }[]): Promise<void>;
    createTransaction(props?: TransactionProps): Transaction;
    exec(tx: Transaction): Promise<import("./data/info").TxReceiptInfo>;
    send(tx: Transaction, config: Partial<TransactionHandlerConfig>): import("strict-event-emitter-types/types/src").StrictEventEmitter<import("events"), import("./transaction/transaction-handler").TransactionEvents, import("./transaction/transaction-handler").TransactionEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    sendAsync(tx: Transaction, config: Partial<TransactionHandlerConfig>): Promise<import("./data/info").TxInfo>;
}
