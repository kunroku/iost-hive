/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { TransactionPending, TransactionRPC } from './api';
import { Tx } from './data/params';
import { Transaction } from './tx';
export type TransactionHandlerConfig = {
    interval: number;
    times: number;
    irreversible: boolean;
};
export interface TransactionEvents {
    send: () => void;
    pending: (res: TransactionPending) => void;
    success: (res: Tx) => void;
    failed: (error: {
        message: string;
    }) => void;
    irreversible: (res: Tx) => void;
}
export type TransactionHandlerStatus = 'idle' | 'send' | 'pending' | 'success' | 'failed' | 'irreversible';
export declare class TransactionHandler {
    private readonly _tx;
    private readonly _host;
    readonly event: StrictEventEmitter<EventEmitter, TransactionEvents>;
    readonly rpc: TransactionRPC;
    readonly config: TransactionHandlerConfig;
    private status;
    constructor(_tx: Transaction, _host: string, config: Partial<TransactionHandlerConfig>);
    send(): Promise<Tx>;
}
