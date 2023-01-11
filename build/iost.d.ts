/// <reference types="node" />
import { RPC } from './api';
import { KeyPairPermission } from './data/params';
import { Transaction, TransactionProps } from './transaction/transaction';
import { TransactionHandlerConfig } from './transaction/transaction-handler';
import { Wallet } from './wallet';
export type IOSTConfig = {
    host: string;
    chainId: number;
};
export declare class IOST {
    #private;
    get config(): IOSTConfig;
    get serverTimeDiff(): number;
    constructor(config?: Partial<IOSTConfig>);
    get rpc(): RPC;
    setServerTimeDiff(): Promise<number>;
    sign(wallet: Wallet, tx: Transaction, publisher: string, signers: {
        id: string;
        permission: KeyPairPermission;
    }[]): Promise<void>;
    createTransaction(props: TransactionProps): Transaction;
    exec(tx: Transaction): Promise<import("./data/info").TxReceiptInfo>;
    send(tx: Transaction, config: Partial<TransactionHandlerConfig>): import("strict-event-emitter-types/types/src").StrictEventEmitter<import("events"), import("./transaction/transaction-handler").TransactionEvents, import("./transaction/transaction-handler").TransactionEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    sendAsync(tx: Transaction, config: Partial<TransactionHandlerConfig>): Promise<import("./data/info").TxInfo>;
}
