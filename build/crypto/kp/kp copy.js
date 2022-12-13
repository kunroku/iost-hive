"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPair = exports.AlgoType = void 0;
var AlgoType;
(function (AlgoType) {
    AlgoType[AlgoType["SECP256K1"] = 1] = "SECP256K1";
    AlgoType[AlgoType["ED25519"] = 2] = "ED25519";
})(AlgoType = exports.AlgoType || (exports.AlgoType = {}));
class KeyPair {
    constructor(algoType, secretKey, publicKey) {
        this.algoType = algoType;
        this.secretKey = secretKey;
        this.publicKey = publicKey;
        this.algoName = AlgoType[algoType];
    }
}
exports.KeyPair = KeyPair;
//# sourceMappingURL=kp%20copy.js.map