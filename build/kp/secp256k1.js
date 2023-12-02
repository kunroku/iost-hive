"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1 = void 0;
const buffer_1 = require("buffer");
const bn_js_1 = require("bn.js");
const elliptic_1 = require("elliptic");
const crypto_1 = require("../crypto");
const abstract_kp_1 = require("./abstract-kp");
const utils_1 = require("../utils");
const secp = new elliptic_1.ec('secp256k1');
class Secp256k1 extends abstract_kp_1.AbstractKeyPair {
    constructor(pubkey, seckey) {
        super(abstract_kp_1.KeyPairAlgorithm.SECP256K1, pubkey, seckey);
    }
    sign(data) {
        const keyPair = secp.keyFromPrivate(this.seckey);
        const sig = keyPair.sign(data);
        const r = sig.r;
        const n = new bn_js_1.default('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 16);
        let s = n.sub(sig.s);
        if (s.gt(sig.s)) {
            s = sig.s;
        }
        const buffer = buffer_1.Buffer.concat([
            buffer_1.Buffer.from(r.toArray()),
            buffer_1.Buffer.from(s.toArray()),
        ]);
        return new crypto_1.Signature(this.type, this.name, utils_1.Bs58.decode(this.pubkey), buffer);
    }
    verify(data, signature) {
        const r = new bn_js_1.default(signature.slice(0, 32).toString('hex'), 16);
        const s = new bn_js_1.default(signature.slice(32, 64).toString('hex'), 16);
        return secp.verify(data, { r, s }, utils_1.Bs58.decode(this.pubkey));
    }
    static fromPublicKey(pubkey) {
        return new Secp256k1(pubkey, null);
    }
    static fromSecretKey(seckey) {
        const kp = secp.keyFromPrivate(seckey);
        return new Secp256k1(buffer_1.Buffer.from(kp.getPublic(true, 'hex'), 'hex'), buffer_1.Buffer.from(kp.getPrivate('hex'), 'hex'));
    }
    static randomKeyPair() {
        const kp = secp.genKeyPair();
        return new Secp256k1(buffer_1.Buffer.from(kp.getPublic(true, 'hex'), 'hex'), buffer_1.Buffer.from(kp.getPrivate('hex'), 'hex'));
    }
}
exports.Secp256k1 = Secp256k1;
//# sourceMappingURL=secp256k1.js.map