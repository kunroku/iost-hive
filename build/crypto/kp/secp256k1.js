"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1 = void 0;
const bn_js_1 = require("bn.js");
const elliptic_1 = require("elliptic");
const kp_1 = require("./kp");
const secp = new elliptic_1.ec('secp256k1');
class Secp256k1 extends kp_1.KeyPair {
    constructor(secretKey) {
        const keyPair = secp.keyFromPrivate(secretKey);
        super(kp_1.AlgoType.SECP256K1, Buffer.from(keyPair.getPrivate('hex'), 'hex'), Buffer.from(keyPair.getPublic(true, 'hex'), 'hex'));
    }
    sign(data) {
        const keyPair = secp.keyFromPrivate(this.secretKey);
        const sig = keyPair.sign(data);
        const r = sig.r;
        const n = new bn_js_1.default('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 16);
        let s = n.sub(sig.s);
        if (s.gt(sig.s)) {
            s = sig.s;
        }
        return Buffer.concat([Buffer.from(r.toArray()), Buffer.from(s.toArray())]);
    }
    verify(data, sig) {
        const r = new bn_js_1.default(sig.slice(0, 32).toString('hex'), 16);
        const s = new bn_js_1.default(sig.slice(32, 64).toString('hex'), 16);
        return secp.verify(data, { r, s }, this.publicKey);
    }
    static randomKeyPair() {
        const keyPair = secp.genKeyPair();
        return new Secp256k1(Buffer.from(keyPair.getPrivate('hex'), 'hex'));
    }
}
exports.Secp256k1 = Secp256k1;
//# sourceMappingURL=secp256k1.js.map