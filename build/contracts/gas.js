"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GASContract = void 0;
const contract_interface_1 = require("./contract-interface");
class GASContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'gas.iost';
    }
    pledge(pledgor, to, amount) {
        this._call('pledge', [pledgor, to, amount]);
    }
    unpledge(pledgor, from, amount) {
        this._call('pledge', [pledgor, from, amount]);
    }
}
exports.GASContract = GASContract;
//# sourceMappingURL=gas.js.map