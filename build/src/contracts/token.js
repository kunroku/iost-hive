"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenContract = void 0;
const official_contract_1 = require("./official-contract");
class TokenContract extends official_contract_1.OfficialContract {
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
exports.TokenContract = TokenContract;
//# sourceMappingURL=token.js.map