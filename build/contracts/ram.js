"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAMContract = void 0;
const contract_interface_1 = require("./contract-interface");
class RAMContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'ram.iost';
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
exports.RAMContract = RAMContract;
//# sourceMappingURL=ram.js.map