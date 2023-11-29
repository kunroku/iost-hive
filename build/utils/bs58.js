"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bs58 = void 0;
const bs58 = require("bs58");
const buffer_1 = require("./buffer");
class Bs58 {
    static encode(buf) {
        return bs58.encode(buf);
    }
    static decode(str) {
        return buffer_1.Buffer.from(bs58.decode(str));
    }
}
exports.Bs58 = Bs58;
//# sourceMappingURL=bs58.js.map