"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _TransactionHandler_event, _TransactionHandler_tx, _TransactionHandler_rpc, _TransactionHandler_config, _TransactionHandler_status;
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
    get event() {
        return __classPrivateFieldGet(this, _TransactionHandler_event, "f");
    }
    constructor(tx, host, config) {
        _TransactionHandler_event.set(this, new events_1.EventEmitter());
        _TransactionHandler_tx.set(this, void 0);
        _TransactionHandler_rpc.set(this, void 0);
        _TransactionHandler_config.set(this, void 0);
        _TransactionHandler_status.set(this, 'idle');
        __classPrivateFieldSet(this, _TransactionHandler_tx, tx, "f");
        __classPrivateFieldSet(this, _TransactionHandler_rpc, new api_1.RPC(host), "f");
        __classPrivateFieldSet(this, _TransactionHandler_config, Object.assign(Object.assign({}, defaultTransactionConfig), config), "f");
    }
    async send() {
        if (__classPrivateFieldGet(this, _TransactionHandler_status, "f") !== 'idle') {
            throw new Error('invalid transaction handler status');
        }
        __classPrivateFieldSet(this, _TransactionHandler_status, 'send', "f");
        __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('send');
        const txPendingRes = await __classPrivateFieldGet(this, _TransactionHandler_rpc, "f").sendTx(__classPrivateFieldGet(this, _TransactionHandler_tx, "f"));
        const hash = txPendingRes.hash;
        __classPrivateFieldSet(this, _TransactionHandler_status, 'pending', "f");
        __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('pending', txPendingRes);
        return new Promise((resolve, reject) => {
            let i = 0;
            const interval = setInterval(async () => {
                i++;
                if (__classPrivateFieldGet(this, _TransactionHandler_config, "f").times < i) {
                    const errorMessage = 'transaction response timeout';
                    __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('failed', { message: errorMessage });
                    reject(errorMessage);
                    clearInterval(interval);
                }
                else {
                    const res = await __classPrivateFieldGet(this, _TransactionHandler_rpc, "f")
                        .getTxByHash(hash)
                        .catch(() => null);
                    if (!res)
                        return;
                    const receipt = res.transaction.tx_receipt;
                    switch (receipt.status_code) {
                        case 'SUCCESS': {
                            if (__classPrivateFieldGet(this, _TransactionHandler_status, "f") !== 'success') {
                                __classPrivateFieldSet(this, _TransactionHandler_status, 'success', "f");
                                __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('success', res);
                                if (!__classPrivateFieldGet(this, _TransactionHandler_config, "f").irreversible) {
                                    clearInterval(interval);
                                    resolve(res);
                                }
                            }
                            break;
                        }
                        case 'IRREVERSIBLE': {
                            if (__classPrivateFieldGet(this, _TransactionHandler_status, "f") !== 'irreversible') {
                                if (__classPrivateFieldGet(this, _TransactionHandler_status, "f") !== 'success') {
                                    __classPrivateFieldSet(this, _TransactionHandler_status, 'success', "f");
                                    __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('success', res);
                                }
                                __classPrivateFieldSet(this, _TransactionHandler_status, 'irreversible', "f");
                                __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('irreversible', res);
                                if (__classPrivateFieldGet(this, _TransactionHandler_config, "f").irreversible) {
                                    resolve(res);
                                    clearInterval(interval);
                                }
                            }
                            break;
                        }
                        default: {
                            if (receipt.status_code && self.status === 'pending') {
                                __classPrivateFieldSet(this, _TransactionHandler_status, 'failed', "f");
                                __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('failed', { message: receipt.message });
                                reject(receipt.message);
                                clearInterval(interval);
                            }
                            break;
                        }
                    }
                }
            }, __classPrivateFieldGet(this, _TransactionHandler_config, "f").interval);
        });
    }
}
exports.TransactionHandler = TransactionHandler;
_TransactionHandler_event = new WeakMap(), _TransactionHandler_tx = new WeakMap(), _TransactionHandler_rpc = new WeakMap(), _TransactionHandler_config = new WeakMap(), _TransactionHandler_status = new WeakMap();
//# sourceMappingURL=transaction-handler.js.map