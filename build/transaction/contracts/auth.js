"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContractTransaction = void 0;
const abstract_contract_1 = require("./abstract-contract");
class AuthContractTransaction extends abstract_contract_1.AbstractContractTransaction {
    constructor() {
        super(...arguments);
        this.id = 'auth.iost';
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
exports.AuthContractTransaction = AuthContractTransaction;
//# sourceMappingURL=auth.js.map