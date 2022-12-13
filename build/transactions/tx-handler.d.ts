/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { TransactionPending } from '../api';
import { TxInfo } from '../data/info';
import { Transaction } from './tx';
export type TransactionHandlerConfig = {
    interval: number;
    times: number;
    irreversible: boolean;
};
export interface TransactionEvents {
    send: () => void;
    pending: (res: TransactionPending) => void;
    success: (res: TxInfo) => void;
    failed: (error: {
        message: string;
    }) => void;
    irreversible: (res: TxInfo) => void;
}
export type TransactionHandlerStatus = 'idle' | 'send' | 'pending' | 'success' | 'failed' | 'irreversible';
export declare class TransactionHandler {
    private readonly _tx;
    private readonly _host;
    readonly event: StrictEventEmitter<EventEmitter, TransactionEvents>;
    private readonly _rpc;
    readonly config: TransactionHandlerConfig;
    private status;
    constructor(_tx: Transaction, _host: string, config: Partial<TransactionHandlerConfig>);
    send(): Promise<TxInfo>;
}
