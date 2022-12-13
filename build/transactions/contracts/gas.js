"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GASContractTransaction = void 0;
const contract_1 = require("./contract");
class GASContractTransaction extends contract_1.AbstractContractTransaction {
    constructor() {
        super(...arguments);
        this.id = 'gas.iost';
    }
    pledge(pledgor, to, amount) {
        this.call('pledge', [pledgor, to, amount]);
    }
    unpledge(pledgor, from, amount) {
        this.call('pledge', [pledgor, from, amount]);
    }
}
exports.GASContractTransaction = GASContractTransaction;
//# sourceMappingURL=gas.js.map