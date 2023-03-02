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
var _Wallet_accounts, _Wallet_password;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const account_1 = require("./account");
const tweetnacl_1 = require("tweetnacl");
const bs58_1 = require("./utils/bs58");
const utils_1 = require("./utils");
const _password2key = (password) => {
    const key = (0, utils_1.sha3)(256, Buffer.from(password));
    return key;
};
class Wallet {
    get accounts() {
        return __classPrivateFieldGet(this, _Wallet_accounts, "f").map((acc) => acc.name);
    }
    constructor(accounts, password) {
        _Wallet_accounts.set(this, []);
        _Wallet_password.set(this, void 0);
        for (const account of accounts) {
            this.addAccount(account);
        }
        __classPrivateFieldSet(this, _Wallet_password, password, "f");
    }
    sign(id, permission, data) {
        const account = __classPrivateFieldGet(this, _Wallet_accounts, "f").find((e) => e.name === id);
        if (!account) {
            throw new Error(`account not found ${id}`);
        }
        return account.sign(permission, data);
    }
    addAccount(account) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === account.name);
        if (index !== -1) {
            throw new Error(`account already exits ${account.name}`);
        }
        __classPrivateFieldGet(this, _Wallet_accounts, "f").push(account_1.Account.parse(account.toString()));
    }
    updateAccount(account) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === account.name);
        if (index === -1) {
            throw new Error(`account not found ${account.name}`);
        }
        __classPrivateFieldGet(this, _Wallet_accounts, "f")[index] = account_1.Account.parse(account.toString());
    }
    removeAccount(id) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === id);
        if (index === -1) {
            throw new Error(`account not found ${id}`);
        }
        __classPrivateFieldGet(this, _Wallet_accounts, "f").splice(index, 1);
    }
    updatePassword(password) {
        __classPrivateFieldSet(this, _Wallet_password, password, "f");
    }
    verify(id, permission, data, signature) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === id);
        if (index === -1) {
            throw new Error(`account not found ${id}`);
        }
        const account = __classPrivateFieldGet(this, _Wallet_accounts, "f")[index];
        return account.verify(permission, data, signature);
    }
    toString() {
        const nonce = (0, tweetnacl_1.randomBytes)(tweetnacl_1.secretbox.nonceLength);
        const key = _password2key(__classPrivateFieldGet(this, _Wallet_password, "f"));
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
        const decrypted = Buffer.from(tweetnacl_1.secretbox.open(encryptedBuffer, nonceBuffer, key));
        const accounts = JSON.parse(decrypted.toString('utf-8'));
        const wallet = new Wallet(accounts.map((account) => account_1.Account.parse(account)), password);
        return wallet;
    }
}
exports.Wallet = Wallet;
_Wallet_accounts = new WeakMap(), _Wallet_password = new WeakMap();
//# sourceMappingURL=wallet.js.map