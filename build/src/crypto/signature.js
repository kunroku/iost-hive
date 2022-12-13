"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signature = void 0;
const codec_1 = require("./codec");
class Signature {
    constructor(name, type, pubkey, sig) {
        this.name = name;
        this.type = type;
        this.pubkey = pubkey;
        this.sig = sig;
    }
    bytes() {
        const c = new codec_1.Codec();
        c.pushByte(this.type);
        c.pushBytes(this.sig);
        c.pushBytes(this.pubkey);
        return c.buf;
    }
    toJSON() {
        return {
            algorithm: this.name,
            public_key: this.pubkey.toString('base64'),
            signature: this.sig.toString('base64'),
        };
    }
}
exports.Signature = Signature;
//# sourceMappingURL=signature.js.map