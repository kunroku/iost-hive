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
const buffer_1 = require("buffer");
const codec_1 = require("./codec");
class Signature {
    get name() {
        return __classPrivateFieldGet(this, _Signature_name, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _Signature_type, "f");
    }
    get pubkey() {
        return buffer_1.Buffer.from(__classPrivateFieldGet(this, _Signature_pubkey, "f"), 'base64');
    }
    get sig() {
        return buffer_1.Buffer.from(__classPrivateFieldGet(this, _Signature_sig, "f"), 'base64');
    }
    constructor(type, name, pubkey, sig) {
        _Signature_name.set(this, void 0);
        _Signature_type.set(this, void 0);
        _Signature_pubkey.set(this, void 0);
        _Signature_sig.set(this, void 0);
        __classPrivateFieldSet(this, _Signature_type, type, "f");
        __classPrivateFieldSet(this, _Signature_name, name, "f");
        __classPrivateFieldSet(this, _Signature_pubkey, buffer_1.Buffer.from(pubkey).toString('base64'), "f");
        __classPrivateFieldSet(this, _Signature_sig, buffer_1.Buffer.from(sig).toString('base64'), "f");
    }
    toBuffer() {
        const c = new codec_1.Codec();
        c.pushByte(this.type);
        c.pushBytes(this.sig);
        c.pushBytes(this.pubkey);
        return c.toBuffer();
    }
    toJSON() {
        return {
            algorithm: this.name,
            public_key: __classPrivateFieldGet(this, _Signature_pubkey, "f"),
            signature: __classPrivateFieldGet(this, _Signature_sig, "f"),
        };
    }
}
exports.Signature = Signature;
_Signature_name = new WeakMap(), _Signature_type = new WeakMap(), _Signature_pubkey = new WeakMap(), _Signature_sig = new WeakMap();
//# sourceMappingURL=signature.js.map