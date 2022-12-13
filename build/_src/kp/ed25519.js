"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519 = void 0;
const tweetnacl_1 = require("tweetnacl");
const kp_1 = require("./kp");
class Ed25519 extends kp_1.AbstractKeyPair {
    constructor(secretKey) {
        const keyPair = tweetnacl_1.sign.keyPair.fromSecretKey(secretKey);
        super(kp_1.AlgorithmType.ED25519, Buffer.from(keyPair.secretKey), Buffer.from(keyPair.publicKey));
    }
    sign(data) {
        return Buffer.from(tweetnacl_1.sign.detached(data, this.seckey));
    }
    verify(data, sig) {
        return tweetnacl_1.sign.detached.verify(data, sig, this.pubkey);
    }
    static randomKeyPair() {
        const keyPair = tweetnacl_1.sign.keyPair();
        return new Ed25519(Buffer.from(keyPair.secretKey));
    }
}
exports.Ed25519 = Ed25519;
//# sourceMappingURL=ed25519.js.map