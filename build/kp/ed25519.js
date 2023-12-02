"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519 = void 0;
const tweetnacl_1 = require("tweetnacl");
const buffer_1 = require("buffer");
const crypto_1 = require("../crypto");
const abstract_kp_1 = require("./abstract-kp");
const utils_1 = require("../utils");
class Ed25519 extends abstract_kp_1.AbstractKeyPair {
    constructor(pubkey, seckey) {
        super(abstract_kp_1.KeyPairAlgorithm.ED25519, pubkey, seckey);
    }
    sign(data) {
        const buffer = buffer_1.Buffer.from(tweetnacl_1.sign.detached(data, utils_1.Bs58.decode(this.seckey)));
        return new crypto_1.Signature(this.type, this.name, utils_1.Bs58.decode(this.pubkey), buffer);
    }
    verify(data, signature) {
        return tweetnacl_1.sign.detached.verify(data, signature, utils_1.Bs58.decode(this.pubkey));
    }
    static fromPublicKey(pubkey) {
        return new Ed25519(pubkey, null);
    }
    static fromSecretKey(seckey) {
        const kp = tweetnacl_1.sign.keyPair.fromSecretKey(seckey);
        return new Ed25519(buffer_1.Buffer.from(kp.publicKey), seckey);
    }
    static fromSeed(seed) {
        const kp = tweetnacl_1.sign.keyPair.fromSeed(seed);
        return new Ed25519(buffer_1.Buffer.from(kp.publicKey), buffer_1.Buffer.from(kp.secretKey));
    }
    static randomKeyPair() {
        const kp = tweetnacl_1.sign.keyPair();
        return new Ed25519(buffer_1.Buffer.from(kp.publicKey), buffer_1.Buffer.from(kp.secretKey));
    }
}
exports.Ed25519 = Ed25519;
//# sourceMappingURL=ed25519.js.map