"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ConstantWalletRequestHandler_requireSign, _ConstantWalletRequestHandler_requireAddAccount, _ConstantWalletRequestHandler_requireUpdateAccount, _ConstantWalletRequestHandler_requireRemoveAccount, _ConstantWalletRequestHandler_requireUpdatePassword, _Wallet_instances, _Wallet_accounts, _Wallet_password, _Wallet_walletRequestHandler, _Wallet_sign, _Wallet_addAccount, _Wallet_updateAccount, _Wallet_removeAccount, _Wallet_updatePassword;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.ConstantWalletRequestHandler = void 0;
const account_1 = require("./account");
const tweetnacl_1 = require("tweetnacl");
const bs58_1 = require("./utils/bs58");
const utils_1 = require("./utils");
const name_1 = require("./constants/name");
const _password2key = (password) => {
    const key = (0, utils_1.sha3)(256, Buffer.from(password));
    return key;
};
class ConstantWalletRequestHandler {
    constructor(requireSign, requireAddAccount, requireUpdateAccount, requireRemoveAccount, requireUpdatePassword) {
        _ConstantWalletRequestHandler_requireSign.set(this, void 0);
        _ConstantWalletRequestHandler_requireAddAccount.set(this, void 0);
        _ConstantWalletRequestHandler_requireUpdateAccount.set(this, void 0);
        _ConstantWalletRequestHandler_requireRemoveAccount.set(this, void 0);
        _ConstantWalletRequestHandler_requireUpdatePassword.set(this, void 0);
        __classPrivateFieldSet(this, _ConstantWalletRequestHandler_requireSign, requireSign, "f");
        __classPrivateFieldSet(this, _ConstantWalletRequestHandler_requireAddAccount, requireAddAccount, "f");
        __classPrivateFieldSet(this, _ConstantWalletRequestHandler_requireUpdateAccount, requireUpdateAccount, "f");
        __classPrivateFieldSet(this, _ConstantWalletRequestHandler_requireRemoveAccount, requireRemoveAccount, "f");
        __classPrivateFieldSet(this, _ConstantWalletRequestHandler_requireUpdatePassword, requireUpdatePassword, "f");
    }
    get requireSign() {
        return __classPrivateFieldGet(this, _ConstantWalletRequestHandler_requireSign, "f");
    }
    get requireAddAccount() {
        return __classPrivateFieldGet(this, _ConstantWalletRequestHandler_requireAddAccount, "f");
    }
    get requireUpdateAccount() {
        return __classPrivateFieldGet(this, _ConstantWalletRequestHandler_requireUpdateAccount, "f");
    }
    get requireRemoveAccount() {
        return __classPrivateFieldGet(this, _ConstantWalletRequestHandler_requireRemoveAccount, "f");
    }
    get requireUpdatePassword() {
        return __classPrivateFieldGet(this, _ConstantWalletRequestHandler_requireUpdatePassword, "f");
    }
}
exports.ConstantWalletRequestHandler = ConstantWalletRequestHandler;
_ConstantWalletRequestHandler_requireSign = new WeakMap(), _ConstantWalletRequestHandler_requireAddAccount = new WeakMap(), _ConstantWalletRequestHandler_requireUpdateAccount = new WeakMap(), _ConstantWalletRequestHandler_requireRemoveAccount = new WeakMap(), _ConstantWalletRequestHandler_requireUpdatePassword = new WeakMap();
class Wallet {
    get accounts() {
        return __classPrivateFieldGet(this, _Wallet_accounts, "f").map((acc) => acc.id);
    }
    constructor(accounts, password, walletRequestHandler) {
        _Wallet_instances.add(this);
        _Wallet_accounts.set(this, []);
        _Wallet_password.set(this, void 0);
        _Wallet_walletRequestHandler.set(this, void 0);
        for (const account of accounts) {
            __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_addAccount).call(this, account);
        }
        __classPrivateFieldSet(this, _Wallet_password, password, "f");
        __classPrivateFieldSet(this, _Wallet_walletRequestHandler, walletRequestHandler, "f");
    }
    async sign(id, permission, data) {
        const auth = await __classPrivateFieldGet(this, _Wallet_walletRequestHandler, "f").requireSign(id, permission, data);
        if (auth) {
            return __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_sign).call(this, id, permission, data);
        }
    }
    async addAccount(account) {
        const auth = await __classPrivateFieldGet(this, _Wallet_walletRequestHandler, "f").requireAddAccount(account);
        if (auth) {
            return __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_addAccount).call(this, account);
        }
    }
    async updateAccount(account) {
        const auth = await __classPrivateFieldGet(this, _Wallet_walletRequestHandler, "f").requireUpdateAccount(account);
        if (auth) {
            return __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_updateAccount).call(this, account);
        }
    }
    async removeAccount(id) {
        const auth = await __classPrivateFieldGet(this, _Wallet_walletRequestHandler, "f").requireRemoveAccount(id);
        if (auth) {
            return __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_removeAccount).call(this, id);
        }
    }
    async updatePassword(password) {
        const auth = await __classPrivateFieldGet(this, _Wallet_walletRequestHandler, "f").requireUpdatePassword(password);
        if (auth) {
            return __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_updatePassword).call(this, password);
        }
    }
    verify(id, permission, data, signature) {
        const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.id === id);
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
    static connect() {
        return window[name_1.LIBRARY_NAME] ? window[name_1.LIBRARY_NAME] : null;
    }
    static parse(data, password, auth) {
        const [nonce, encrypted] = data.split(':');
        const nonceBuffer = bs58_1.Bs58.decode(nonce);
        const encryptedBuffer = bs58_1.Bs58.decode(encrypted);
        const key = _password2key(password);
        const decrypted = Buffer.from(tweetnacl_1.secretbox.open(encryptedBuffer, nonceBuffer, key));
        const accounts = JSON.parse(decrypted.toString('utf-8'));
        const wallet = new Wallet(accounts.map((account) => account_1.Account.parse(account)), password, auth);
        return wallet;
    }
}
exports.Wallet = Wallet;
_Wallet_accounts = new WeakMap(), _Wallet_password = new WeakMap(), _Wallet_walletRequestHandler = new WeakMap(), _Wallet_instances = new WeakSet(), _Wallet_sign = function _Wallet_sign(id, permission, data) {
    const account = __classPrivateFieldGet(this, _Wallet_accounts, "f").find((e) => e.id === id);
    if (!account) {
        throw new Error(`account not found ${id}`);
    }
    return account.sign(permission, data);
}, _Wallet_addAccount = function _Wallet_addAccount(account) {
    const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.id === account.id);
    if (index !== -1) {
        throw new Error(`account already exits ${account.id}`);
    }
    __classPrivateFieldGet(this, _Wallet_accounts, "f").push(account_1.Account.parse(account.toString()));
}, _Wallet_updateAccount = function _Wallet_updateAccount(account) {
    const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.id === account.id);
    if (index === -1) {
        throw new Error(`account not found ${account.id}`);
    }
    __classPrivateFieldGet(this, _Wallet_accounts, "f")[index] = account_1.Account.parse(account.toString());
}, _Wallet_removeAccount = function _Wallet_removeAccount(id) {
    const index = __classPrivateFieldGet(this, _Wallet_accounts, "f").findIndex((e) => e.id === id);
    if (index === -1) {
        throw new Error(`account not found ${id}`);
    }
    __classPrivateFieldGet(this, _Wallet_accounts, "f").splice(index, 1);
}, _Wallet_updatePassword = function _Wallet_updatePassword(password) {
    __classPrivateFieldSet(this, _Wallet_password, password, "f");
};
//# sourceMappingURL=wallet.js.map