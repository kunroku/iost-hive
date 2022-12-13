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
var _Signature_name, _Signature_type, _Signature_pubkey, _Signature_sig;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signature = void 0;
const codec_1 = require("./codec");
const kp_1 = require("../kp/kp");
const utils_1 = require("../utils");
class Signature {
    get name() {
        return __classPrivateFieldGet(this, _Signature_name, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _Signature_type, "f");
    }
    get pubkey() {
        return utils_1.Bs58.decode(__classPrivateFieldGet(this, _Signature_pubkey, "f"));
    }
    get sig() {
        return utils_1.Bs58.decode(__classPrivateFieldGet(this, _Signature_sig, "f"));
    }
    constructor(type, pubkey, sig) {
        _Signature_name.set(this, void 0);
        _Signature_type.set(this, void 0);
        _Signature_pubkey.set(this, void 0);
        _Signature_sig.set(this, void 0);
        __classPrivateFieldSet(this, _Signature_type, type, "f");
        __classPrivateFieldSet(this, _Signature_name, kp_1.AlgorithmType[type], "f");
        __classPrivateFieldSet(this, _Signature_pubkey, utils_1.Bs58.encode(pubkey), "f");
        __classPrivateFieldSet(this, _Signature_sig, utils_1.Bs58.encode(sig), "f");
    }
    buffer() {
        const c = new codec_1.Codec();
        c.pushByte(this.type);
        c.pushBytes(this.sig);
        c.pushBytes(this.pubkey);
        return c.buffer();
    }
    toJSON() {
        return {
            algorithm: this.name,
            public_key: this.pubkey.toString('base64'),
            signature: this.sig.toString('base64'),
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    static parse(data) {
        const json = JSON.parse(data);
        const type = kp_1.AlgorithmType[json.algorithm];
        const pubkey = Buffer.from(json.public_key, 'base64');
        const signature = Buffer.from(json.signature, 'base64');
        return new Signature(Number(type), pubkey, signature);
    }
}
exports.Signature = Signature;
_Signature_name = new WeakMap(), _Signature_type = new WeakMap(), _Signature_pubkey = new WeakMap(), _Signature_sig = new WeakMap();
//# sourceMappingURL=signature.js.map