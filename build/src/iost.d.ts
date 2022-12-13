/// <reference types="node" />
import { RPC } from './api';
import { Transaction, TransactionProps } from './transaction/transaction';
import { TransactionHandlerConfig } from './transaction/transaction-handler';
export type IOSTConfig = {
    host: string;
    chainId: number;
};
export declare class IOST {
    readonly config: IOSTConfig;
    private _serverTimeDiff;
    constructor(config?: Partial<IOSTConfig>);
    get rpc(): RPC;
    setServerTimeDiff(): Promise<number>;
    sign(tx: Transaction): Transaction;
    createTransaction(props: TransactionProps): Transaction;
    exec(tx: Transaction): Promise<import("./data/info").TxReceiptInfo>;
    send(tx: Transaction, config: Partial<TransactionHandlerConfig>): import("strict-event-emitter-types/types/src").StrictEventEmitter<import("events"), import("./transaction/transaction-handler").TransactionEvents, import("./transaction/transaction-handler").TransactionEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    sendAsync(tx: Transaction, config: Partial<TransactionHandlerConfig>): Promise<import("./data/info").TxInfo>;
}
