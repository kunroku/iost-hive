"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GASContract = void 0;
const official_contract_1 = require("./official-contract");
class GASContract extends official_contract_1.OfficialContract {
    get id() {
        return 'gas.iost';
    }
    pledge(pledgor, to, amount) {
        this.call('pledge', [pledgor, to, amount]);
    }
    unpledge(pledgor, from, amount) {
        this.call('pledge', [pledgor, from, amount]);
    }
}
exports.GASContract = GASContract;
//# sourceMappingURL=gas.js.map