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
var _IWallet_instances, _a, _IWallet_instance, _IWallet_extension, _IWallet_adapter_get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IWallet = exports.IWALLET_ADAPTER_PACK = void 0;
const events_1 = require("events");
const account_1 = require("../account");
const api_1 = require("../api");
const iwallet_adapter_1 = require("./iwallet-adapter");
const iwallet_extension_1 = require("./iwallet-extension");
exports.IWALLET_ADAPTER_PACK = {
    IOST: iwallet_adapter_1.IOSTAdapter,
    HTTPProvider: api_1.HTTPProvider,
    RPC: api_1.RPC,
    Account: account_1.Account,
};
class IWallet {
    get host() {
        return __classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).host;
    }
    get chainId() {
        return __classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).chainId;
    }
    get account() {
        return __classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).account;
    }
    set account(account) {
        __classPrivateFieldGet(this, _IWallet_extension, "f").setAccount(account);
    }
    constructor(extension) {
        _IWallet_instances.add(this);
        _IWallet_extension.set(this, void 0);
        __classPrivateFieldSet(this, _IWallet_extension, extension, "f");
    }
    static async connect() {
        const extension = (0, iwallet_extension_1.getIwalletJS)();
        if (!extension) {
            throw new Error('iwallet not installed');
        }
        if (!__classPrivateFieldGet(this, _a, "f", _IWallet_instance)) {
            try {
                await extension.enable();
            }
            catch (error) {
                throw new Error('iwallet locked');
            }
            __classPrivateFieldSet(this, _a, new IWallet(extension), "f", _IWallet_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _IWallet_instance);
    }
    signAndSend(tx) {
        const event = new events_1.EventEmitter();
        const handler = __classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).signAndSend(JSON.parse(tx.toString()));
        handler.on('pending', (res) => event.emit('pending', res));
        handler.on('success', (res) => event.emit('success', res));
        handler.on('failed', (res) => event.emit('failed', res));
        return event;
    }
    async signAndSendAsync(tx) {
        const event = this.signAndSend(tx);
        return await new Promise((resolve, reject) => {
            event.on('success', (res) => {
                resolve(res);
            });
            event.on('failed', (res) => {
                reject(res);
            });
        });
    }
    signMessage(message) {
        const event = new events_1.EventEmitter();
        const handler = __classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).signMessage(message);
        handler.on('pending', () => event.emit('pending'));
        handler.on('success', (res) => event.emit('success', res));
        handler.on('failed', (res) => event.emit('failed', res));
        return event;
    }
    async signMessageAsync(message) {
        const event = this.signMessage(message);
        return await new Promise((resolve, reject) => {
            event.on('success', (res) => {
                resolve(res);
            });
            event.on('failed', (res) => {
                reject(res);
            });
        });
    }
    setAccount(account) {
        this.account = account;
    }
}
exports.IWallet = IWallet;
_a = IWallet, _IWallet_extension = new WeakMap(), _IWallet_instances = new WeakSet(), _IWallet_adapter_get = function _IWallet_adapter_get() {
    return __classPrivateFieldGet(this, _IWallet_extension, "f").newIOST(exports.IWALLET_ADAPTER_PACK);
};
_IWallet_instance = { value: void 0 };
//# sourceMappingURL=iwallet.js.map