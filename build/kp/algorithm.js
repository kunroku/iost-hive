"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _KeyPairAlgorithm_seckey, _KeyPairAlgorithm_pubkey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPairAlgorithm = void 0;
const bs58_1 = require("../utils/bs58");
class KeyPairAlgorithm {
    get pubkey() {
        return bs58_1.Bs58.decode(__classPrivateFieldGet(this, _KeyPairAlgorithm_pubkey, "f"));
    }
    get seckey() {
        return __classPrivateFieldGet(this, _KeyPairAlgorithm_seckey, "f") ? bs58_1.Bs58.decode(__classPrivateFieldGet(this, _KeyPairAlgorithm_seckey, "f")) : null;
    }
    constructor(pubkey, seckey) {
        _KeyPairAlgorithm_seckey.set(this, void 0);
        _KeyPairAlgorithm_pubkey.set(this, void 0);
        __classPrivateFieldSet(this, _KeyPairAlgorithm_pubkey, bs58_1.Bs58.encode(pubkey), "f");
        __classPrivateFieldSet(this, _KeyPairAlgorithm_seckey, seckey && bs58_1.Bs58.encode(seckey), "f");
    }
}
exports.KeyPairAlgorithm = KeyPairAlgorithm;
_KeyPairAlgorithm_seckey = new WeakMap(), _KeyPairAlgorithm_pubkey = new WeakMap();
//# sourceMappingURL=algorithm.js.map