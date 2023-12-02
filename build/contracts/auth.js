"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContract = void 0;
const contract_interface_1 = require("./contract-interface");
class AuthContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'auth.iost';
    }
    addPermission(id, permision, threshold) {
        this._call('addPermission', [id, permision, threshold]);
    }
    dropPermission(id, permision) {
        this._call('dropPermission', [id, permision]);
    }
    assignPermission(id, permision, publicKey, weight) {
        this._call('assignPermission', [id, permision, publicKey, weight]);
    }
    revokePermission(id, permision, publicKey) {
        this._call('revokePermission', [id, permision, publicKey]);
    }
    signUp(id, ownerkey, activekey) {
        this._call('signUp', [id, ownerkey, activekey]);
    }
}
exports.AuthContract = AuthContract;
//# sourceMappingURL=auth.js.map