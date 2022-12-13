"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const kp_1 = require("./kp");
const bs58_1 = require("./utils/bs58");
const crypto_1 = require("./crypto");
class Account {
    constructor(id) {
        this.id = id;
        this.auth = {
            active: [],
            owner: [],
        };
    }
    addKeyPair(permission, keyPair) {
        this.auth[permission].push(keyPair);
        return this;
    }
    sign(data, permission) {
        return this.auth[permission].map((kp) => new crypto_1.Signature(kp.name, kp.type, kp.sign(data), kp.pubkey));
    }
    toJSON() {
        const json = {
            id: this.id,
            auth: { active: [], owner: [] },
        };
        for (const keyPair of this.auth.active) {
            json.auth.active.push(keyPair.toJSON());
        }
        for (const keyPair of this.auth.owner) {
            json.auth.owner.push(keyPair.toJSON());
        }
        return json;
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
    static parse(data) {
        const { id, auth } = JSON.parse(data);
        const account = new Account(id);
        for (const permission of ['active', 'owner']) {
            for (const key of auth[permission]) {
                switch (key.type) {
                    case kp_1.AlgoType.SECP256K1: {
                        const kp = new kp_1.Secp256k1(bs58_1.Bs58.decode(key.seckey));
                        account.addKeyPair(permission, kp);
                        break;
                    }
                    case kp_1.AlgoType.ED25519: {
                        const kp = new kp_1.Ed25519(bs58_1.Bs58.decode(key.seckey));
                        account.addKeyPair(permission, kp);
                        break;
                    }
                    default:
                        break;
                }
            }
        }
        return account;
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map