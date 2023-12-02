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
var _KeyPair_kp;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPair = void 0;
const bs58_1 = require("../utils/bs58");
const abstract_kp_1 = require("./abstract-kp");
const secp256k1_1 = require("./secp256k1");
const ed25519_1 = require("./ed25519");
const createKeyPair = (type, pubkey, seckey) => {
    if (seckey) {
        return KeyPair.fromSecretKey(type, seckey);
    }
    else if (pubkey) {
        return KeyPair.fromPublicKey(type, pubkey);
    }
    else {
        throw new Error('pubkey or seckey is required');
    }
};
class KeyPair extends abstract_kp_1.AbstractKeyPair {
    constructor(type, pubkey, seckey) {
        const kp = createKeyPair(type, pubkey, seckey);
        super(kp.type, bs58_1.Bs58.decode(kp.pubkey), bs58_1.Bs58.decode(kp.seckey));
        _KeyPair_kp.set(this, void 0);
        __classPrivateFieldSet(this, _KeyPair_kp, kp, "f");
    }
    sign(data) {
        return __classPrivateFieldGet(this, _KeyPair_kp, "f").sign(data);
    }
    verify(data, signature) {
        return __classPrivateFieldGet(this, _KeyPair_kp, "f").verify(data, signature);
    }
    static fromPublicKey(type, pubkey) {
        switch (type) {
            case abstract_kp_1.KeyPairAlgorithm.SECP256K1: {
                return secp256k1_1.Secp256k1.fromPublicKey(pubkey);
            }
            case abstract_kp_1.KeyPairAlgorithm.ED25519: {
                return ed25519_1.Ed25519.fromPublicKey(pubkey);
            }
            default: {
                throw new Error('invalid keypair algorithm type');
            }
        }
    }
    static fromSecretKey(type, seckey) {
        switch (type) {
            case abstract_kp_1.KeyPairAlgorithm.SECP256K1: {
                return secp256k1_1.Secp256k1.fromSecretKey(seckey);
            }
            case abstract_kp_1.KeyPairAlgorithm.ED25519: {
                return ed25519_1.Ed25519.fromSecretKey(seckey);
            }
            default: {
                throw new Error('invalid keypair algorithm type');
            }
        }
    }
    static parse(data) {
        const json = JSON.parse(data);
        const pubkey = json.pubkey && bs58_1.Bs58.decode(json.pubkey);
        const seckey = json.seckey && bs58_1.Bs58.decode(json.seckey);
        return createKeyPair(json.type, pubkey, seckey);
    }
}
exports.KeyPair = KeyPair;
_KeyPair_kp = new WeakMap();
//# sourceMappingURL=kp.js.map