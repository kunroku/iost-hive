"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenContractTransaction = void 0;
const contract_1 = require("./contract");
class TokenContractTransaction extends contract_1.AbstractContractTransaction {
    constructor() {
        super(...arguments);
        this.id = 'token.iost';
    }
    create(tokenSymbol, issuer, totalSupply, config) {
        this.call('create', [tokenSymbol, issuer, totalSupply, config]);
    }
    issue(tokenSymbol, to, amount) {
        this.call('issue', [tokenSymbol, to, amount]);
    }
    transfer(tokenSymbol, from, to, amount, memo) {
        this.call('transfer', [tokenSymbol, from, to, amount, memo]);
    }
    transferFreeze(tokenSymbol, from, to, amount, freezeTime, memo) {
        this.call('transferFreeze', [
            tokenSymbol,
            from,
            to,
            amount,
            freezeTime,
            memo,
        ]);
    }
    destroy(tokenSymbol, from, amount) {
        this.call('destroy', [tokenSymbol, from, amount]);
    }
}
exports.TokenContractTransaction = TokenContractTransaction;
//# sourceMappingURL=token.js.map