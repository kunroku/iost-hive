"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeContract = void 0;
const official_contract_1 = require("./official-contract");
class ExchangeContract extends official_contract_1.OfficialContract {
    constructor() {
        super(...arguments);
        this.id = 'exchange.iost';
    }
    transfer(symbol, to, amount, memo) {
        this.call('transfer', [symbol, to, amount, memo]);
    }
    createAccountAndTransfer(id, amount, ownerKey, activeKey) {
        this.transfer('iost', '', amount, `create:${id}:${ownerKey}:${activeKey}`);
    }
}
exports.ExchangeContract = ExchangeContract;
//# sourceMappingURL=exchange.js.map