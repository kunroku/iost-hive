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
var _AbstractKeyPair_type, _AbstractKeyPair_name, _AbstractKeyPair_pubkey, _AbstractKeyPair_seckey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractKeyPair = exports.KeyPairAlgorithm = void 0;
const bs58_1 = require("../utils/bs58");
var KeyPairAlgorithm;
(function (KeyPairAlgorithm) {
    KeyPairAlgorithm[KeyPairAlgorithm["SECP256K1"] = 1] = "SECP256K1";
    KeyPairAlgorithm[KeyPairAlgorithm["ED25519"] = 2] = "ED25519";
})(KeyPairAlgorithm = exports.KeyPairAlgorithm || (exports.KeyPairAlgorithm = {}));
class AbstractKeyPair {
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
    constructor(type, pubkey, seckey) {
        _AbstractKeyPair_type.set(this, void 0);
        _AbstractKeyPair_name.set(this, void 0);
        _AbstractKeyPair_pubkey.set(this, void 0);
        _AbstractKeyPair_seckey.set(this, void 0);
        __classPrivateFieldSet(this, _AbstractKeyPair_type, type, "f");
        __classPrivateFieldSet(this, _AbstractKeyPair_name, KeyPairAlgorithm[type], "f");
        __classPrivateFieldSet(this, _AbstractKeyPair_pubkey, bs58_1.Bs58.encode(pubkey), "f");
        __classPrivateFieldSet(this, _AbstractKeyPair_seckey, seckey && bs58_1.Bs58.encode(seckey), "f");
    }
    toJSON() {
        return {
            type: this.type,
            pubkey: __classPrivateFieldGet(this, _AbstractKeyPair_pubkey, "f"),
            seckey: __classPrivateFieldGet(this, _AbstractKeyPair_seckey, "f"),
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
exports.AbstractKeyPair = AbstractKeyPair;
_AbstractKeyPair_type = new WeakMap(), _AbstractKeyPair_name = new WeakMap(), _AbstractKeyPair_pubkey = new WeakMap(), _AbstractKeyPair_seckey = new WeakMap();
//# sourceMappingURL=abstract-kp.js.map