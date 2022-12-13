"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519 = void 0;
const tweetnacl_1 = require("tweetnacl");
const algorithm_1 = require("./algorithm");
class Ed25519 extends algorithm_1.KeyPairAlgorithm {
    sign(data) {
        const buffer = Buffer.from(tweetnacl_1.sign.detached(data, this.seckey));
        return buffer;
    }
    verify(data, signature) {
        return tweetnacl_1.sign.detached.verify(data, signature, this.pubkey);
    }
    static fromPublicKey(pubkey) {
        return new Ed25519(pubkey, null);
    }
    static fromSecretKey(seckey) {
        const kp = tweetnacl_1.sign.keyPair.fromSecretKey(seckey);
        return new Ed25519(Buffer.from(kp.publicKey), seckey);
    }
    static randomKeyPair() {
        const kp = tweetnacl_1.sign.keyPair();
        return new Ed25519(Buffer.from(kp.publicKey), Buffer.from(kp.secretKey));
    }
}
exports.Ed25519 = Ed25519;
//# sourceMappingURL=ed25519.js.map