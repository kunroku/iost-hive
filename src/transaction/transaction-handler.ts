import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { TransactionPending, RPC } from '../api';
import { TxInfo } from '../data/info';
import { Transaction } from './transaction';

export type TransactionHandlerConfig = {
  interval: number;
  times: number;
  irreversible: boolean;
};

const defaultTransactionConfig: TransactionHandlerConfig = {
  interval: 250,
  times: 300,
  irreversible: false,
};

export type TransactionEvents = {
  send: () => void;
  pending: (res: TransactionPending) => void;
  packed: (res: TxInfo) => void;
  irreversible: (res: TxInfo) => void;
  failed: (error: { message: string }) => void;
};

export type TransactionHandlerStatus =
  | 'idle'
  | 'send'
  | 'pending'
  | 'failed'
  | 'packed'
  | 'irreversible';

export class TransactionHandler {
  readonly #event: StrictEventEmitter<EventEmitter, TransactionEvents> =
    new EventEmitter();
  readonly #tx: Transaction;
  readonly #rpc: RPC;
  readonly #config: TransactionHandlerConfig;
  #status: TransactionHandlerStatus = 'idle';
  constructor(
    tx: Transaction,
    host: string,
    config: Partial<TransactionHandlerConfig>,
  ) {
    this.#tx = tx;
    this.#rpc = new RPC(host);
    this.#config = { ...defaultTransactionConfig, ...config };
  }
  send() {
    if (this.#status !== 'idle') {
      throw new Error('invalid transaction handler status');
    }
    this.#status = 'send';
    this.#event.emit('send');
    this.#rpc
      .sendTx(this.#tx)
      .then((txPendingRes) => {
        const hash = txPendingRes.hash;
        this.#status = 'pending';
        this.#event.emit('pending', txPendingRes);
        let i = 0;
        const interval = setInterval(async () => {
          i++;
          if (this.#config.times < i) {
            this.#event.emit('failed', {
              message: 'transaction response timeout',
            });
            clearInterval(interval);
          } else {
            const res: TxInfo | null = await this.#rpc
              .getTxByHash(hash)
              .catch(() => null);
            if (res) {
              switch (res.status) {
                case 'PACKED': {
                  if (this.#status !== 'packed') {
                    this.#status = 'packed';
                    this.#event.emit('packed', res);
                    if (!this.#config.irreversible) {
                      clearInterval(interval);
                    }
                  }
                  break;
                }
                case 'IRREVERSIBLE': {
                  if (this.#status !== 'irreversible') {
                    this.#status = 'irreversible';
                    this.#event.emit('irreversible', res);
                    clearInterval(interval);
                  }
                  break;
                }
                default:
                  break;
              }
            }
          }
        }, this.#config.interval);
      })
      .catch((error: { message: string }) => {
        this.#status = 'failed';
        this.#event.emit('failed', { message: error.message });
      });
    return this.#event;
  }
  async sendAsync() {
    const eventListener = this.send();
    return new Promise<TxInfo>((resolve, reject) => {
      if (this.#config.irreversible) {
        eventListener.once('irreversible', (res) => resolve(res));
      } else {
        eventListener.once('packed', (res) => resolve(res));
      }
      eventListener.once('failed', (error) => reject(error));
    });
  }
}
