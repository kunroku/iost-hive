"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Wallet_accounts;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.AbstractWallet = void 0;
const tweetnacl_1 = require("tweetnacl");
const buffer_1 = require("buffer");
const account_1 = require("./account");
const bs58_1 = require("./utils/bs58");
const utils_1 = require("./utils");
const _password2key = (password) => {
    const key = (0, utils_1.sha3)(256, buffer_1.Buffer.from(password));
    return key;
};
class AbstractWallet {
}
exports.AbstractWallet = AbstractWallet;
class Wallet extends AbstractWallet {
    get accounts() {
        return __classPrivateFieldGet(this, _Wallet_accounts, "f").map((acc) => acc.name);
    }
    constructor(accounts) {
        super();
        _Wallet_accounts.set(this, []);
        for (const account of accounts) {
            this.add(account);
        }
    }
    async sign(name, permission, data) {
        const account = __classPrivateFieldGet(this, _Wallet_accounts, "f").find((e) => e.name === name);
        if (!account) {
            throw new Error(`account not found ${name}`);
        }
        return account.sign(permission, data);
    }
    async authorize(name, network) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === name);
        if (index === -1) {
            throw new Error(`account not found ${name}`);
        }
        const account = __classPrivateFieldGet(this, _Wallet_accounts, "f")[index];
        return await account.authorize(network);
    }
    add(account) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === account.name);
        if (index !== -1) {
            throw new Error(`account already exits ${account.name}`);
        }
        __classPrivateFieldGet(this, _Wallet_accounts, "f").push(account_1.Account.parse(account.toString()));
    }
    update(account) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === account.name);
        if (index === -1) {
            throw new Error(`account not found ${account.name}`);
        }
        __classPrivateFieldGet(this, _Wallet_accounts, "f")[index] = account_1.Account.parse(account.toString());
    }
    remove(name) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === name);
        if (index === -1) {
            throw new Error(`account not found ${name}`);
        }
        __classPrivateFieldGet(this, _Wallet_accounts, "f").splice(index, 1);
    }
    verify(id, permission, data, signature) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.name === id);
        if (index === -1) {
            throw new Error(`account not found ${id}`);
        }
        const account = __classPrivateFieldGet(this, _Wallet_accounts, "f")[index];
        return account.verify(permission, data, signature);
    }
    toString(password = '') {
        const nonce = (0, tweetnacl_1.randomBytes)(tweetnacl_1.secretbox.nonceLength);
        const key = _password2key(password);
        const accounts = __classPrivateFieldGet(this, _Wallet_accounts, "f").map((acc) => acc.toString());
        const str = JSON.stringify(accounts);
        const box = (0, tweetnacl_1.secretbox)(buffer_1.Buffer.from(str, 'utf-8'), nonce, key);
        const nonceBs58 = bs58_1.Bs58.encode(buffer_1.Buffer.from(nonce));
        const boxBs58 = bs58_1.Bs58.encode(buffer_1.Buffer.from(box));
        return `${nonceBs58}:${boxBs58}`;
    }
    static parse(data, password = '') {
        const [nonce, encrypted] = data.split(':');
        const nonceBuffer = bs58_1.Bs58.decode(nonce);
        const encryptedBuffer = bs58_1.Bs58.decode(encrypted);
        const key = _password2key(password);
        const decrypted = buffer_1.Buffer.from(tweetnacl_1.secretbox.open(encryptedBuffer, nonceBuffer, key));
        const accounts = JSON.parse(decrypted.toString('utf-8'));
        const wallet = new Wallet(accounts.map((account) => account_1.Account.parse(account)));
        return wallet;
    }
}
exports.Wallet = Wallet;
_Wallet_accounts = new WeakMap();
//# sourceMappingURL=wallet.js.map