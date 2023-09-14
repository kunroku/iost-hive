"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeContract = void 0;
const contract_interface_1 = require("./contract-interface");
class ExchangeContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'exchange.iost';
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