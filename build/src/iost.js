"use strict";
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
    constructor(config = {}) {
        this._serverTimeDiff = 0;
        this.config = Object.assign(Object.assign({}, defaultConfig), config);
    }
    get rpc() {
        return new api_1.RPC(this.config.host);
    }
    async setServerTimeDiff() {
        const requestStartTime = new Date().getTime() * 1e6;
        const nodeInfo = await this.rpc.getNodeInfo();
        const requestEndTime = new Date().getTime() * 1e6;
        if (requestEndTime - requestStartTime < 30 * 1e9) {
            this._serverTimeDiff = Number(nodeInfo.server_time) - requestStartTime;
        }
        return this._serverTimeDiff;
    }
    sign(tx) {
        return tx;
    }
    createTransaction(props) {
        return new transaction_1.Transaction(Object.assign({ chainId: this.config.chainId }, props));
    }
    async exec(tx) {
        return await this.rpc.execTx(tx);
    }
    send(tx, config) {
        const handler = new transaction_handler_1.TransactionHandler(tx, this.config.host, config);
        handler.send();
        return handler.event;
    }
    async sendAsync(tx, config) {
        const handler = new transaction_handler_1.TransactionHandler(tx, this.config.host, config);
        return await handler.send();
    }
}
exports.IOST = IOST;
//# sourceMappingURL=iost.js.map