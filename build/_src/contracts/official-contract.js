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
var _OfficialContract_tx;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficialContract = void 0;
class OfficialContract {
    constructor(tx) {
        _OfficialContract_tx.set(this, void 0);
        __classPrivateFieldSet(this, _OfficialContract_tx, tx, "f");
    }
    call(abi, args) {
        __classPrivateFieldGet(this, _OfficialContract_tx, "f").addAction(this.id, abi, args);
    }
}
exports.OfficialContract = OfficialContract;
_OfficialContract_tx = new WeakMap();
//# sourceMappingURL=official-contract.js.map