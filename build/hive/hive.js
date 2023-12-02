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
var _Hive_network, _Hive_wallet, _Hive_account, _Hive_signRequestCallback, _Hive_connectRequestCallback;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hive = void 0;
const iost_1 = require("../iost");
const wallet_1 = require("../wallet");
const network_manager_1 = require("./network-manager");
class Hive extends wallet_1.AbstractWallet {
    get account() {
        return __classPrivateFieldGet(this, _Hive_account, "f");
    }
    set account(name) {
        __classPrivateFieldSet(this, _Hive_account, name, "f");
    }
    get accounts() {
        return __classPrivateFieldGet(this, _Hive_wallet, "f").accounts;
    }
    get network() {
        return __classPrivateFieldGet(this, _Hive_network, "f").network;
    }
    set network(network) {
        __classPrivateFieldGet(this, _Hive_network, "f").network = network;
    }
    get networks() {
        return JSON.parse(JSON.stringify(__classPrivateFieldGet(this, _Hive_network, "f").networks));
    }
    get iost() {
        return new iost_1.IOST(this.networks[this.network]);
    }
    constructor(accounts, account, networks, network, signRequestCallback, connectRequestCallback) {
        super();
        _Hive_network.set(this, void 0);
        _Hive_wallet.set(this, void 0);
        _Hive_account.set(this, void 0);
        _Hive_signRequestCallback.set(this, void 0);
        _Hive_connectRequestCallback.set(this, void 0);
        __classPrivateFieldSet(this, _Hive_wallet, new wallet_1.Wallet(accounts), "f");
        __classPrivateFieldSet(this, _Hive_account, account, "f");
        __classPrivateFieldSet(this, _Hive_network, new network_manager_1.NetworkManager(networks, network), "f");
        __classPrivateFieldSet(this, _Hive_signRequestCallback, signRequestCallback, "f");
        __classPrivateFieldSet(this, _Hive_connectRequestCallback, connectRequestCallback, "f");
    }
    async sign(name, permission, data) {
        const bool = await __classPrivateFieldGet(this, _Hive_signRequestCallback, "f").call(this, name, permission, data);
        if (!bool) {
            throw new Error('sign request denied');
        }
        return __classPrivateFieldGet(this, _Hive_wallet, "f").sign(name, permission, data);
    }
    async authorize(name) {
        return await __classPrivateFieldGet(this, _Hive_wallet, "f").authorize(name, this.networks[this.network]);
    }
    async connect() {
        const extension = window && window['hive'];
        if (!extension) {
            throw new Error('hive not installed');
        }
        const bool = await __classPrivateFieldGet(this, _Hive_connectRequestCallback, "f").call(this);
        if (!bool) {
            throw new Error('conenct request denied');
        }
        return extension;
    }
}
exports.Hive = Hive;
_Hive_network = new WeakMap(), _Hive_wallet = new WeakMap(), _Hive_account = new WeakMap(), _Hive_signRequestCallback = new WeakMap(), _Hive_connectRequestCallback = new WeakMap();
//# sourceMappingURL=hive.js.map