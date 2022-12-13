"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusContract = void 0;
const official_contract_1 = require("./official-contract");
class BonusContract extends official_contract_1.OfficialContract {
    get id() {
        return 'bonus.iost';
    }
    issueContribute(parent) {
        this.call('issueContribute', [{ parent: [parent] }]);
    }
    exchangeIOST(account, amount) {
        this.call('exchangeIOST', [account, amount]);
    }
}
exports.BonusContract = BonusContract;
//# sourceMappingURL=bonus.js.map