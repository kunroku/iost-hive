"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRPC = void 0;
const abstract_rpc_1 = require("./abstract-rpc");
class TransactionRPC extends abstract_rpc_1.AbstractRPC {
    async sendTx(tx) {
        const url = 'sendTx';
        return await this.post(url, tx.toString());
    }
    async getTxByHash(hash) {
        const url = `getTxByHash/${hash}`;
        return await this.get(url);
    }
    async getTxReceiptByTxHash(hash) {
        const url = `getTxReceiptByTxHash/${hash}`;
        return await this.get(url);
    }
}
exports.TransactionRPC = TransactionRPC;
//# sourceMappingURL=tx.js.map