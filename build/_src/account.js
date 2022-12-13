"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Account_auth, _Account_id;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const kp_1 = require("./kp");
const bs58_1 = require("./utils/bs58");
const crypto_1 = require("./crypto");
class Account {
    get id() {
        return __classPrivateFieldGet(this, _Account_id, "f");
    }
    constructor(_id) {
        _Account_auth.set(this, void 0);
        _Account_id.set(this, void 0);
        __classPrivateFieldSet(this, _Account_auth, {
            active: [],
            owner: [],
        }, "f");
        __classPrivateFieldSet(this, _Account_id, _id, "f");
    }
    addKeyPair(permission, keyPair) {
        __classPrivateFieldGet(this, _Account_auth, "f")[permission].push(keyPair);
        return this;
    }
    sign(data, permission) {
        return __classPrivateFieldGet(this, _Account_auth, "f")[permission].map((kp) => new crypto_1.Signature(kp.type, kp.sign(data), kp.pubkey));
    }
    get json() {
        const json = {
            id: this.id,
            auth: { active: [], owner: [] },
        };
        for (const keyPair of __classPrivateFieldGet(this, _Account_auth, "f").active) {
            json.auth.active.push(keyPair.toJSON());
        }
        for (const keyPair of __classPrivateFieldGet(this, _Account_auth, "f").owner) {
            json.auth.owner.push(keyPair.toJSON());
        }
        return json;
    }
    toString() {
        return JSON.stringify(this.json);
    }
    static parse(data) {
        const { id, auth } = JSON.parse(data);
        const account = new Account(id);
        for (const permission of ['active', 'owner']) {
            for (const key of auth[permission]) {
                switch (key.type) {
                    case kp_1.AlgorithmType.SECP256K1: {
                        const kp = new kp_1.Secp256k1(bs58_1.Bs58.decode(key.seckey));
                        account.addKeyPair(permission, kp);
                        break;
                    }
                    case kp_1.AlgorithmType.ED25519: {
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
_Account_auth = new WeakMap(), _Account_id = new WeakMap();
//# sourceMappingURL=account.js.map