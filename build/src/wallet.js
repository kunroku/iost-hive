"use strict";
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
        const _accounts = [];
        const _getAccontIndex = (id) => {
            return _accounts.findIndex((e) => e.id === id);
        };
        const _getAccont = (id) => {
            return _accounts.find((e) => e.id === id);
        };
        this.sign = (id, permission, data) => {
            const account = _getAccont(id);
            if (!account) {
                throw new Error(`account not found ${id}`);
            }
            return account.sign(data, permission);
        };
        this.removeAccount = (id) => {
            const index = _getAccontIndex(id);
            if (index !== -1) {
                _accounts.splice(index, 1);
            }
        };
        this.updateAccount = (account) => {
            const index = _getAccontIndex(account.id);
            if (index !== -1) {
                _accounts[index] = account;
            }
        };
        this.toString = (password) => {
            const nonce = (0, tweetnacl_1.randomBytes)(tweetnacl_1.secretbox.nonceLength);
            const key = _password2key(password);
            const accounts = _accounts.map((acc) => acc.toString());
            const str = JSON.stringify(accounts);
            const box = (0, tweetnacl_1.secretbox)(Buffer.from(str, 'utf-8'), nonce, key);
            const nonceBs58 = bs58_1.Bs58.encode(Buffer.from(nonce));
            const boxBs58 = bs58_1.Bs58.encode(Buffer.from(box));
            return `${nonceBs58}:${boxBs58}`;
        };
    }
    sign(id, permission, data) {
        throw new Error(`wallet not initialized`);
    }
    addAccount(account) {
        throw new Error(`wallet not initialized`);
    }
    updateAccount(account) {
        throw new Error(`wallet not initialized`);
    }
    removeAccount(id) {
        throw new Error(`wallet not initialized`);
    }
    toString(password) {
        throw new Error(`wallet not initialized`);
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
//# sourceMappingURL=wallet.js.map