/// <reference types="node" />
import { RPC } from './api';
import { NetworkConfig, KeyPairPermission } from './data/params';
import { Transaction, TransactionProps } from './transaction/transaction';
import { TransactionHandlerConfig } from './transaction/transaction-handler';
import { AbstractWallet } from './wallet';
export declare class IOST {
    #private;
    get config(): NetworkConfig;
    get serverTimeDiff(): number;
    get rpc(): RPC;
    constructor(config: NetworkConfig);
    setServerTimeDiff(): Promise<number>;
    sign(wallet: AbstractWallet, tx: Transaction, publisher: string, signers: {
        id: string;
        permission: KeyPairPermission;
    }[]): Promise<void>;
    createTransaction(props?: TransactionProps): Transaction;
    exec(tx: Transaction): Promise<import("./data/info").TxReceiptInfo>;
    send(tx: Transaction, config: Partial<TransactionHandlerConfig>): import("strict-event-emitter-types/types/src").StrictEventEmitter<import("events"), import("./transaction/transaction-handler").TransactionEvents, import("./transaction/transaction-handler").TransactionEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    sendAsync(tx: Transaction, config: Partial<TransactionHandlerConfig>): Promise<import("./data/info").TxInfo>;
}
