"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const kp_1 = require("./kp");
const bs58_1 = require("./utils/bs58");
const api_1 = require("./api");
class Account {
    constructor(name) {
        this.name = name;
        this.auth = {
            active: [],
            owner: [],
        };
    }
    addKeyPair(permission, keyPair) {
        this.auth[permission].push(keyPair);
        return this;
    }
    sign(permission, data) {
        return this.auth[permission].map((kp) => kp.sign(data));
    }
    verify(permission, data, signature) {
        for (const kp of this.auth[permission]) {
            const isSignatureValid = kp.verify(data, signature);
            if (isSignatureValid) {
                return true;
            }
        }
        return false;
    }
    toJSON() {
        const json = {
            name: this.name,
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
    async authorize(network) {
        const rpc = new api_1.RPC(new api_1.HTTPProvider(network.host));
        const info = await rpc.getAccount(this.name);
        const res = {
            active: { weight: 0, threshold: 0, available: false },
            owner: { weight: 0, threshold: 0, available: false },
        };
        for (const kp of this.auth.active) {
            const pubkey = kp.pubkey;
            for (const permission of info.permissions.active.items) {
                if (permission.id === pubkey) {
                    res.active.weight += Number(permission.weight);
                }
            }
            res.active.threshold = Number(info.permissions.active.threshold);
        }
        if (res.active.threshold <= res.active.weight) {
            res.active.available = true;
        }
        for (const kp of this.auth.owner) {
            const pubkey = kp.pubkey;
            for (const permission of info.permissions.owner.items) {
                if (permission.id === pubkey) {
                    res.owner.weight += Number(permission.weight);
                }
            }
            res.owner.threshold = Number(info.permissions.owner.threshold);
        }
        if (res.owner.threshold <= res.owner.weight) {
            res.owner.available = true;
        }
        return res;
    }
    static parse(data) {
        const { name, auth } = JSON.parse(data);
        const account = new Account(name);
        for (const permission of ['active', 'owner']) {
            for (const key of auth[permission]) {
                const kp = new kp_1.KeyPair(key.type, bs58_1.Bs58.decode(key.pubkey), key.seckey && bs58_1.Bs58.decode(key.seckey));
                account.addKeyPair(permission, kp);
            }
        }
        return account;
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map