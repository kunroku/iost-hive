"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractKeyPair = exports.AlgoType = void 0;
const bs58_1 = require("../utils/bs58");
var AlgoType;
(function (AlgoType) {
    AlgoType[AlgoType["SECP256K1"] = 1] = "SECP256K1";
    AlgoType[AlgoType["ED25519"] = 2] = "ED25519";
})(AlgoType = exports.AlgoType || (exports.AlgoType = {}));
class AbstractKeyPair {
    constructor(type, seckey, pubkey) {
        this.type = type;
        this.seckey = seckey;
        this.pubkey = pubkey;
        this.name = AlgoType[type];
    }
    toJSON() {
        return {
            type: this.type,
            seckey: bs58_1.Bs58.encode(this.seckey),
        };
    }
    toString() {
        const json = this.toJSON();
        return JSON.stringify(json);
    }
}
exports.AbstractKeyPair = AbstractKeyPair;
//# sourceMappingURL=kp.js.map