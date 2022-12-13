"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAMContractTransaction = void 0;
const abstract_contract_1 = require("./abstract-contract");
class RAMContractTransaction extends abstract_contract_1.AbstractContractTransaction {
    constructor() {
        super(...arguments);
        this.id = 'ram.iost';
    }
    buy(payer, receiver, amount) {
        this.call('buy', [payer, receiver, amount]);
    }
    sell(seller, receiver, amount) {
        this.call('sell', [seller, receiver, amount]);
    }
    lend(from, to, amount) {
        this.call('lend', [from, to, amount]);
    }
}
exports.RAMContractTransaction = RAMContractTransaction;
//# sourceMappingURL=ram.js.map