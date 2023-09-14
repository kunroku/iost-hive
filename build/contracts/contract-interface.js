"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ContractInterface_tx;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractInterface = void 0;
class ContractInterface {
    constructor(tx) {
        _ContractInterface_tx.set(this, void 0);
        __classPrivateFieldSet(this, _ContractInterface_tx, tx, "f");
    }
    call(abi, args) {
        __classPrivateFieldGet(this, _ContractInterface_tx, "f").addAction(this.id, abi, args);
    }
}
exports.ContractInterface = ContractInterface;
_ContractInterface_tx = new WeakMap();
//# sourceMappingURL=contract-interface.js.map