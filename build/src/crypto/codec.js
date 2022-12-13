"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codec = void 0;
const Long = require("long");
class Codec {
    constructor() {
        this.buf = Buffer.alloc(0);
    }
    pushInt(len) {
        const bb = Buffer.alloc(4);
        bb.writeInt32BE(len, 0);
        this.buf = Buffer.concat([this.buf, bb]);
        return this;
    }
    pushByte(n) {
        const bb = Buffer.alloc(1);
        bb.writeUInt8(n, 0);
        this.buf = Buffer.concat([this.buf, bb]);
        return this;
    }
    pushInt64(n) {
        const l = Long.fromString(n.toString());
        const bb = Buffer.alloc(8);
        bb.writeInt32BE(l.high, 0);
        bb.writeInt32BE(l.low, 4);
        this.buf = Buffer.concat([this.buf, bb]);
        return this;
    }
    pushString(s) {
        const bb = Buffer.from(s);
        this.pushInt(bb.length);
        this.buf = Buffer.concat([this.buf, bb]);
        return this;
    }
    pushBytes(b) {
        this.pushInt(b.length);
        this.buf = Buffer.concat([this.buf, b]);
        return this;
    }
}
exports.Codec = Codec;
//# sourceMappingURL=codec.js.map