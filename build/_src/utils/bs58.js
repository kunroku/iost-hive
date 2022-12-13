"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bs58 = void 0;
const bs58 = require("bs58");
class Bs58 {
    static encode(buf) {
        return bs58.encode(buf);
    }
    static decode(str) {
        return Buffer.from(bs58.decode(str));
    }
}
exports.Bs58 = Bs58;
//# sourceMappingURL=bs58.js.map