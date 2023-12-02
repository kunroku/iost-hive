"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusContract = void 0;
const contract_interface_1 = require("./contract-interface");
class BonusContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'bonus.iost';
    }
    issueContribute(parent) {
        this._call('issueContribute', [{ parent: [parent] }]);
    }
    exchangeIOST(account, amount) {
        this._call('exchangeIOST', [account, amount]);
    }
}
exports.BonusContract = BonusContract;
//# sourceMappingURL=bonus.js.map