"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHandler = void 0;
const events_1 = require("events");
const api_1 = require("../api");
const defaultTransactionConfig = {
    interval: 250,
    times: 100,
    irreversible: false,
};
class TransactionHandler {
    constructor(_tx, _host, config) {
        this._tx = _tx;
        this._host = _host;
        this.event = new events_1.EventEmitter();
        this.status = 'idle';
        this._rpc = new api_1.RPC(this._host);
        this.config = Object.assign(Object.assign({}, defaultTransactionConfig), config);
    }
    async send() {
        if (this.status !== 'idle') {
            throw new Error('invalid transaction handler status');
        }
        this.status = 'send';
        this.event.emit('send');
        const txPendingRes = await this._rpc.sendTx(this._tx);
        const hash = txPendingRes.hash;
        this.status = 'pending';
        this.event.emit('pending', txPendingRes);
        return new Promise((resolve, reject) => {
            let i = 0;
            const interval = setInterval(async () => {
                i++;
                if (this.config.times < i) {
                    const errorMessage = 'transaction response timeout';
                    this.event.emit('failed', { message: errorMessage });
                    reject(errorMessage);
                    clearInterval(interval);
                }
                else {
                    const res = await this._rpc
                        .getTxByHash(hash)
                        .catch(() => null);
                    if (!res)
                        return;
                    const receipt = res.transaction.tx_receipt;
                    switch (receipt.status_code) {
                        case 'SUCCESS': {
                            if (this.status !== 'success') {
                                this.status = 'success';
                                this.event.emit('success', res);
                                if (!this.config.irreversible) {
                                    clearInterval(interval);
                                    resolve(res);
                                }
                            }
                            break;
                        }
                        case 'IRREVERSIBLE': {
                            if (this.status !== 'irreversible') {
                                if (this.status !== 'success') {
                                    this.status = 'success';
                                    this.event.emit('success', res);
                                }
                                this.status = 'irreversible';
                                this.event.emit('irreversible', res);
                                if (this.config.irreversible) {
                                    resolve(res);
                                    clearInterval(interval);
                                }
                            }
                            break;
                        }
                        default: {
                            if (receipt.status_code && self.status === 'pending') {
                                this.status = 'failed';
                                this.event.emit('failed', { message: receipt.message });
                                reject(receipt.message);
                                clearInterval(interval);
                            }
                            break;
                        }
                    }
                }
            }, this.config.interval);
        });
    }
}
exports.TransactionHandler = TransactionHandler;
//# sourceMappingURL=transaction-handler.js.map