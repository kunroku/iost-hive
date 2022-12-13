import { TxInfo, TxReceiptInfo } from '../data/info';
import { Transaction } from '../transaction/tx';
import { AbstractRPC } from './abstract-rpc';
export type TransactionPending = {
    hash: string;
    pre_tx_receipt: TxReceiptInfo | null;
};
export declare class TransactionRPC extends AbstractRPC {
    sendTx(tx: Transaction): Promise<TransactionPending>;
    getTxByHash(hash: string): Promise<TxInfo>;
    getTxReceiptByTxHash(hash: string): Promise<TxReceiptInfo>;
}
