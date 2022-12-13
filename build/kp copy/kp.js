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
var _KeyPair_type, _KeyPair_name, _KeyPair_kp;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPair = exports.AlgorithmType = void 0;
const bs58_1 = require("../utils/bs58");
const crypto_1 = require("../crypto");
const secp256k1_1 = require("./secp256k1");
const ed25519_1 = require("./ed25519");
var AlgorithmType;
(function (AlgorithmType) {
    AlgorithmType[AlgorithmType["SECP256K1"] = 1] = "SECP256K1";
    AlgorithmType[AlgorithmType["ED25519"] = 2] = "ED25519";
})(AlgorithmType = exports.AlgorithmType || (exports.AlgorithmType = {}));
class KeyPair {
    get type() {
        return __classPrivateFieldGet(this, _KeyPair_type, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _KeyPair_name, "f");
    }
    get pubkey() {
        return __classPrivateFieldGet(this, _KeyPair_kp, "f").pubkey;
    }
    get seckey() {
        return __classPrivateFieldGet(this, _KeyPair_kp, "f").seckey;
    }
    constructor(type, pubkey, seckey) {
        _KeyPair_type.set(this, void 0);
        _KeyPair_name.set(this, void 0);
        _KeyPair_kp.set(this, void 0);
        __classPrivateFieldSet(this, _KeyPair_type, type, "f");
        __classPrivateFieldSet(this, _KeyPair_name, AlgorithmType[type], "f");
        switch (type) {
            case AlgorithmType.SECP256K1: {
                __classPrivateFieldSet(this, _KeyPair_kp, seckey
                    ? secp256k1_1.Secp256k1.fromSecretKey(seckey)
                    : secp256k1_1.Secp256k1.fromPublicKey(pubkey), "f");
                break;
            }
            case AlgorithmType.ED25519: {
                __classPrivateFieldSet(this, _KeyPair_kp, seckey
                    ? ed25519_1.Ed25519.fromSecretKey(seckey)
                    : ed25519_1.Ed25519.fromPublicKey(pubkey), "f");
                break;
            }
            default: {
                throw new Error('invalid keypair algorithm type');
            }
        }
    }
    sign(data) {
        const buffer = __classPrivateFieldGet(this, _KeyPair_kp, "f").sign(data);
        return new crypto_1.Signature(this.type, this.name, this.pubkey, buffer);
    }
    toJSON() {
        return {
            type: this.type,
            pubkey: bs58_1.Bs58.encode(__classPrivateFieldGet(this, _KeyPair_kp, "f").pubkey),
            seckey: __classPrivateFieldGet(this, _KeyPair_kp, "f").seckey && bs58_1.Bs58.encode(__classPrivateFieldGet(this, _KeyPair_kp, "f").seckey),
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    static parse(data) {
        const json = JSON.parse(data);
        return new KeyPair(json.type, bs58_1.Bs58.decode(json.pubkey), json.seckey && bs58_1.Bs58.decode(json.seckey));
    }
}
exports.KeyPair = KeyPair;
_KeyPair_type = new WeakMap(), _KeyPair_name = new WeakMap(), _KeyPair_kp = new WeakMap();
//# sourceMappingURL=kp.js.map