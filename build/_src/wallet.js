"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Wallet_accounts;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const account_1 = require("./account");
const tweetnacl_1 = require("tweetnacl");
const bs58_1 = require("./utils/bs58");
const _password2key = (password) => {
    const key = (0, tweetnacl_1.hash)(Buffer.from(password)).subarray(0, tweetnacl_1.secretbox.keyLength);
    return key;
};
class Wallet {
    constructor() {
        _Wallet_accounts.set(this, []);
    }
    sign(id, permission, data) {
        const account = __classPrivateFieldGet(this, _Wallet_accounts, "f").find((e) => e.id === id);
        if (!account) {
            throw new Error(`account not found ${id}`);
        }
        return account.sign(data, permission);
    }
    addAccount(account) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.id === account.id);
        if (index === -1) {
            __classPrivateFieldGet(this, _Wallet_accounts, "f").push(account_1.Account.parse(account.toString()));
        }
    }
    updateAccount(account) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.id === account.id);
        if (index !== -1) {
            __classPrivateFieldGet(this, _Wallet_accounts, "f")[index] = account_1.Account.parse(account.toString());
        }
    }
    removeAccount(id) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.id === id);
        if (index !== -1) {
            __classPrivateFieldGet(this, _Wallet_accounts, "f").splice(index, 1);
        }
    }
    toString(password) {
        const nonce = (0, tweetnacl_1.randomBytes)(tweetnacl_1.secretbox.nonceLength);
        const key = _password2key(password);
        const accounts = __classPrivateFieldGet(this, _Wallet_accounts, "f").map((acc) => acc.toString());
        const str = JSON.stringify(accounts);
        const box = (0, tweetnacl_1.secretbox)(Buffer.from(str, 'utf-8'), nonce, key);
        const nonceBs58 = bs58_1.Bs58.encode(Buffer.from(nonce));
        const boxBs58 = bs58_1.Bs58.encode(Buffer.from(box));
        return `${nonceBs58}:${boxBs58}`;
    }
    static parse(data, password) {
        const [nonce, encrypted] = data.split(':');
        const nonceBuffer = bs58_1.Bs58.decode(nonce);
        const encryptedBuffer = bs58_1.Bs58.decode(encrypted);
        const key = _password2key(password);
        const dectypted = Buffer.from(tweetnacl_1.secretbox.open(encryptedBuffer, nonceBuffer, key));
        const accounts = JSON.parse(dectypted.toString('utf-8'));
        const wallet = new Wallet();
        accounts.forEach((account) => wallet.addAccount(account_1.Account.parse(account)));
        return wallet;
    }
}
exports.Wallet = Wallet;
_Wallet_accounts = new WeakMap();
//# sourceMappingURL=wallet.js.map