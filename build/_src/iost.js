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
var _IOST_config, _IOST_wallet, _IOST_serverTimeDiff;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOST = void 0;
const api_1 = require("./api");
const transaction_1 = require("./transaction/transaction");
const transaction_handler_1 = require("./transaction/transaction-handler");
const defaultConfig = {
    host: 'http://localhost:30001',
    chainId: 1024,
};
class IOST {
    get serverTimeDiff() {
        return __classPrivateFieldGet(this, _IOST_serverTimeDiff, "f");
    }
    constructor(config = {}, wallet) {
        _IOST_config.set(this, void 0);
        _IOST_wallet.set(this, void 0);
        _IOST_serverTimeDiff.set(this, 0);
        __classPrivateFieldSet(this, _IOST_config, Object.assign(Object.assign({}, defaultConfig), config), "f");
        __classPrivateFieldSet(this, _IOST_wallet, wallet, "f");
    }
    get rpc() {
        return new api_1.RPC(__classPrivateFieldGet(this, _IOST_config, "f").host);
    }
    async setServerTimeDiff() {
        const requestStartTime = new Date().getTime() * 1e6;
        const nodeInfo = await this.rpc.getNodeInfo();
        const requestEndTime = new Date().getTime() * 1e6;
        if (requestEndTime - requestStartTime < 30 * 1e9) {
            __classPrivateFieldSet(this, _IOST_serverTimeDiff, Number(nodeInfo.server_time) - requestStartTime, "f");
        }
        return __classPrivateFieldGet(this, _IOST_serverTimeDiff, "f");
    }
    sign(tx, publisher, signers) {
        for (const signer of signers) {
            tx.addSigner(signer.id, signer.permission);
        }
        for (const signer of signers) {
            const signatures = __classPrivateFieldGet(this, _IOST_wallet, "f").sign(signer.id, signer.permission, tx.getBaseHash());
            for (const sig of signatures) {
                tx.addSign(sig);
            }
        }
        if (publisher) {
            const signatures = __classPrivateFieldGet(this, _IOST_wallet, "f").sign(publisher, 'active', tx.getPublishHash());
            for (const sig of signatures) {
                tx.addPublishSign(publisher, sig);
            }
        }
    }
    createTransaction(props) {
        return new transaction_1.Transaction(Object.assign({ chainId: __classPrivateFieldGet(this, _IOST_config, "f").chainId }, props));
    }
    async exec(tx) {
        return await this.rpc.execTx(tx);
    }
    send(tx, config) {
        const handler = new transaction_handler_1.TransactionHandler(tx, __classPrivateFieldGet(this, _IOST_config, "f").host, config);
        handler.send();
        return handler.event;
    }
    async sendAsync(tx, config) {
        const handler = new transaction_handler_1.TransactionHandler(tx, __classPrivateFieldGet(this, _IOST_config, "f").host, config);
        return await handler.send();
    }
}
exports.IOST = IOST;
_IOST_config = new WeakMap(), _IOST_wallet = new WeakMap(), _IOST_serverTimeDiff = new WeakMap();
//# sourceMappingURL=iost.js.map