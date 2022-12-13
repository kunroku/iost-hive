"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractContractTransaction = void 0;
class AbstractContractTransaction {
    constructor(_tx) {
        this._tx = _tx;
    }
    call(abi, args) {
        this._tx.addAction(this.id, abi, args);
    }
}
exports.AbstractContractTransaction = AbstractContractTransaction;
//# sourceMappingURL=abstract-contract.js.map