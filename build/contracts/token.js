"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenContract = void 0;
const contract_interface_1 = require("./contract-interface");
class TokenContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'token.iost';
    }
    create(symbol, issuer, totalSupply, config) {
        this._call('create', [symbol, issuer, totalSupply, config]);
    }
    issue(symbol, to, amount) {
        this._call('issue', [symbol, to, amount]);
    }
    transfer(symbol, from, to, amount, memo) {
        this._call('transfer', [symbol, from, to, amount, memo]);
    }
    transferFreeze(symbol, from, to, amount, freezeTime, memo) {
        this._call('transferFreeze', [symbol, from, to, amount, freezeTime, memo]);
    }
    destroy(symbol, from, amount) {
        this._call('destroy', [symbol, from, amount]);
    }
}
exports.TokenContract = TokenContract;
//# sourceMappingURL=token.js.map