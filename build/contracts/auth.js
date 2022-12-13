"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContract = void 0;
const official_contract_1 = require("./official-contract");
class AuthContract extends official_contract_1.OfficialContract {
    get id() {
        return 'auth.iost';
    }
    addPermission(id, permision, threshold) {
        this.call('addPermission', [id, permision, threshold]);
    }
    dropPermission(id, permision) {
        this.call('dropPermission', [id, permision]);
    }
    assignPermission(id, permision, publicKey, weight) {
        this.call('assignPermission', [id, permision, publicKey, weight]);
    }
    revokePermission(id, permision, publicKey) {
        this.call('revokePermission', [id, permision, publicKey]);
    }
    signUp(id, ownerkey, activekey) {
        this.call('signUp', [id, ownerkey, activekey]);
    }
}
exports.AuthContract = AuthContract;
//# sourceMappingURL=auth.js.map