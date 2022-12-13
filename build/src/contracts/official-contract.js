"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficialContract = void 0;
class OfficialContract {
    constructor(_tx) {
        this._tx = _tx;
    }
    call(abi, args) {
        this._tx.addAction(this.id, abi, args);
    }
}
exports.OfficialContract = OfficialContract;
//# sourceMappingURL=official-contract.js.map