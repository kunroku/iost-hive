"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AbstractKeyPair_type, _AbstractKeyPair_name, _AbstractKeyPair_seckey, _AbstractKeyPair_pubkey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractKeyPair = exports.AlgorithmType = void 0;
const bs58_1 = require("../utils/bs58");
var AlgorithmType;
(function (AlgorithmType) {
    AlgorithmType[AlgorithmType["SECP256K1"] = 1] = "SECP256K1";
    AlgorithmType[AlgorithmType["ED25519"] = 2] = "ED25519";
})(AlgorithmType = exports.AlgorithmType || (exports.AlgorithmType = {}));
class AbstractKeyPair {
    constructor() {
        _AbstractKeyPair_type.set(this, void 0);
        _AbstractKeyPair_name.set(this, void 0);
        _AbstractKeyPair_seckey.set(this, void 0);
        _AbstractKeyPair_pubkey.set(this, void 0);
    }
    get type() {
        return __classPrivateFieldGet(this, _AbstractKeyPair_type, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _AbstractKeyPair_name, "f");
    }
    get pubkey() {
        return bs58_1.Bs58.decode(__classPrivateFieldGet(this, _AbstractKeyPair_pubkey, "f"));
    }
    get seckey() {
        return __classPrivateFieldGet(this, _AbstractKeyPair_seckey, "f") ? bs58_1.Bs58.decode(__classPrivateFieldGet(this, _AbstractKeyPair_seckey, "f")) : null;
    }
}
exports.AbstractKeyPair = AbstractKeyPair;
_AbstractKeyPair_type = new WeakMap(), _AbstractKeyPair_name = new WeakMap(), _AbstractKeyPair_seckey = new WeakMap(), _AbstractKeyPair_pubkey = new WeakMap();
//# sourceMappingURL=abstract-kp.js.map