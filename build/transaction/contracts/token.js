"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenContractTransaction = void 0;
const abstract_contract_1 = require("./abstract-contract");
class TokenContractTransaction extends abstract_contract_1.AbstractContractTransaction {
    constructor() {
        super(...arguments);
        this.id = 'token.iost';
    }
    create(symbol, issuer, totalSupply, config) {
        this.call('create', [symbol, issuer, totalSupply, config]);
    }
    issue(symbol, to, amount) {
        this.call('issue', [symbol, to, amount]);
    }
    transfer(symbol, from, to, amount, memo) {
        this.call('transfer', [symbol, from, to, amount, memo]);
    }
    transferFreeze(symbol, from, to, amount, freezeTime, memo) {
        this.call('transferFreeze', [symbol, from, to, amount, freezeTime, memo]);
    }
    destroy(symbol, from, amount) {
        this.call('destroy', [symbol, from, amount]);
    }
}
exports.TokenContractTransaction = TokenContractTransaction;
//# sourceMappingURL=token.js.map