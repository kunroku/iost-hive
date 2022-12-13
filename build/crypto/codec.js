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
var _Codec_buffer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codec = void 0;
const Long = require("long");
class Codec {
    constructor() {
        _Codec_buffer.set(this, void 0);
        __classPrivateFieldSet(this, _Codec_buffer, Buffer.alloc(0), "f");
    }
    toBuffer() {
        return Buffer.from(__classPrivateFieldGet(this, _Codec_buffer, "f"));
    }
    pushInt(len) {
        const bb = Buffer.alloc(4);
        bb.writeInt32BE(len, 0);
        __classPrivateFieldSet(this, _Codec_buffer, Buffer.concat([__classPrivateFieldGet(this, _Codec_buffer, "f"), bb]), "f");
        return this;
    }
    pushByte(n) {
        const bb = Buffer.alloc(1);
        bb.writeUInt8(n, 0);
        __classPrivateFieldSet(this, _Codec_buffer, Buffer.concat([__classPrivateFieldGet(this, _Codec_buffer, "f"), bb]), "f");
        return this;
    }
    pushInt64(n) {
        const l = Long.fromString(n.toString());
        const bb = Buffer.alloc(8);
        bb.writeInt32BE(l.high, 0);
        bb.writeInt32BE(l.low, 4);
        __classPrivateFieldSet(this, _Codec_buffer, Buffer.concat([__classPrivateFieldGet(this, _Codec_buffer, "f"), bb]), "f");
        return this;
    }
    pushString(s) {
        const bb = Buffer.from(s);
        this.pushInt(bb.length);
        __classPrivateFieldSet(this, _Codec_buffer, Buffer.concat([__classPrivateFieldGet(this, _Codec_buffer, "f"), bb]), "f");
        return this;
    }
    pushBytes(b) {
        this.pushInt(b.length);
        __classPrivateFieldSet(this, _Codec_buffer, Buffer.concat([__classPrivateFieldGet(this, _Codec_buffer, "f"), b]), "f");
        return this;
    }
}
exports.Codec = Codec;
_Codec_buffer = new WeakMap();
//# sourceMappingURL=codec.js.map