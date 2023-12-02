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
var _ContractStorage_id, _ContractStorage_rpc;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractStorage = void 0;
class ContractStorage {
    constructor(id, rpc) {
        _ContractStorage_id.set(this, void 0);
        _ContractStorage_rpc.set(this, void 0);
        __classPrivateFieldSet(this, _ContractStorage_id, id, "f");
        __classPrivateFieldSet(this, _ContractStorage_rpc, rpc, "f");
    }
    async get(key) {
        return await __classPrivateFieldGet(this, _ContractStorage_rpc, "f").getContractStorage(__classPrivateFieldGet(this, _ContractStorage_id, "f"), key, null);
    }
    async mapGet(key, field) {
        return await __classPrivateFieldGet(this, _ContractStorage_rpc, "f").getContractStorage(__classPrivateFieldGet(this, _ContractStorage_id, "f"), key, field);
    }
    async mapKeys(key) {
        return await __classPrivateFieldGet(this, _ContractStorage_rpc, "f").getContractStorageFields(__classPrivateFieldGet(this, _ContractStorage_id, "f"), key);
    }
    async batchGet(keyFields) {
        return await __classPrivateFieldGet(this, _ContractStorage_rpc, "f").getBatchContractStorage(__classPrivateFieldGet(this, _ContractStorage_id, "f"), keyFields);
    }
}
exports.ContractStorage = ContractStorage;
_ContractStorage_id = new WeakMap(), _ContractStorage_rpc = new WeakMap();
//# sourceMappingURL=contract-storage.js.map