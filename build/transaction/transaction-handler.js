"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TransactionHandler_event, _TransactionHandler_tx, _TransactionHandler_rpc, _TransactionHandler_config, _TransactionHandler_status;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHandler = void 0;
const events_1 = require("events");
const api_1 = require("../api");
const defaultTransactionConfig = {
    interval: 250,
    times: 300,
    irreversible: false,
};
class TransactionHandler {
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
    send() {
        if (__classPrivateFieldGet(this, _TransactionHandler_status, "f") !== 'idle') {
            throw new Error('invalid transaction handler status');
        }
        __classPrivateFieldSet(this, _TransactionHandler_status, 'send', "f");
        __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('send');
        __classPrivateFieldGet(this, _TransactionHandler_rpc, "f")
            .sendTx(__classPrivateFieldGet(this, _TransactionHandler_tx, "f"))
            .then((txPendingRes) => {
            const hash = txPendingRes.hash;
            __classPrivateFieldSet(this, _TransactionHandler_status, 'pending', "f");
            __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('pending', txPendingRes);
            let i = 0;
            const interval = setInterval(async () => {
                i++;
                if (__classPrivateFieldGet(this, _TransactionHandler_config, "f").times < i) {
                    __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('failed', {
                        message: 'transaction response timeout',
                    });
                    clearInterval(interval);
                }
                else {
                    const res = await __classPrivateFieldGet(this, _TransactionHandler_rpc, "f")
                        .getTxByHash(hash)
                        .catch(() => null);
                    if (res) {
                        switch (res.status) {
                            case 'PACKED': {
                                if (__classPrivateFieldGet(this, _TransactionHandler_status, "f") !== 'packed') {
                                    __classPrivateFieldSet(this, _TransactionHandler_status, 'packed', "f");
                                    __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('packed', res);
                                    if (!__classPrivateFieldGet(this, _TransactionHandler_config, "f").irreversible) {
                                        clearInterval(interval);
                                    }
                                }
                                break;
                            }
                            case 'IRREVERSIBLE': {
                                if (__classPrivateFieldGet(this, _TransactionHandler_status, "f") !== 'irreversible') {
                                    __classPrivateFieldSet(this, _TransactionHandler_status, 'irreversible', "f");
                                    __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('irreversible', res);
                                    clearInterval(interval);
                                }
                                break;
                            }
                            default:
                                break;
                        }
                    }
                }
            }, __classPrivateFieldGet(this, _TransactionHandler_config, "f").interval);
        })
            .catch((error) => {
            __classPrivateFieldSet(this, _TransactionHandler_status, 'failed', "f");
            __classPrivateFieldGet(this, _TransactionHandler_event, "f").emit('failed', { message: error.message });
        });
        return __classPrivateFieldGet(this, _TransactionHandler_event, "f");
    }
    async sendAsync() {
        const eventListener = this.send();
        return new Promise((resolve, reject) => {
            if (__classPrivateFieldGet(this, _TransactionHandler_config, "f").irreversible) {
                eventListener.once('irreversible', (res) => resolve(res));
            }
            else {
                eventListener.once('packed', (res) => resolve(res));
            }
            eventListener.once('failed', (error) => reject(error));
        });
    }
}
exports.TransactionHandler = TransactionHandler;
_TransactionHandler_event = new WeakMap(), _TransactionHandler_tx = new WeakMap(), _TransactionHandler_rpc = new WeakMap(), _TransactionHandler_config = new WeakMap(), _TransactionHandler_status = new WeakMap();
//# sourceMappingURL=transaction-handler.js.map