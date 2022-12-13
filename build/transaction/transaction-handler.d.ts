/// <reference types="node" />
import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { TransactionPending } from '../api';
import { TxInfo } from '../data/info';
import { Transaction } from './transaction';
export type TransactionHandlerConfig = {
    interval: number;
    times: number;
    irreversible: boolean;
};
export type TransactionEvents = {
    send: () => void;
    pending: (res: TransactionPending) => void;
    packed: (res: TxInfo) => void;
    irreversible: (res: TxInfo) => void;
    failed: (error: {
        message: string;
    }) => void;
};
export type TransactionHandlerStatus = 'idle' | 'send' | 'pending' | 'failed' | 'packed' | 'irreversible';
export declare class TransactionHandler {
    #private;
    constructor(tx: Transaction, host: string, config: Partial<TransactionHandlerConfig>);
    send(): StrictEventEmitter<EventEmitter, TransactionEvents, TransactionEvents, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    sendAsync(): Promise<TxInfo>;
}
