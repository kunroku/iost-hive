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
var _a, _IWalletAdapterPack_host, _IWalletAdapterPack_chainId, _IWallet_instances, _b, _IWallet_instance, _IWallet_extension, _IWallet_adapter_get;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IWallet = exports.IWalletAdapterPack = void 0;
const events_1 = require("events");
const api_1 = require("../api");
const transaction_1 = require("../transaction");
class Callback {
}
class IWalletAdapterPack {
    static get IOST() {
        return class IOST {
            get host() {
                return __classPrivateFieldGet(IWalletAdapterPack, _a, "f", _IWalletAdapterPack_host);
            }
            get chainId() {
                return __classPrivateFieldGet(IWalletAdapterPack, _a, "f", _IWalletAdapterPack_chainId);
            }
            constructor(config) {
                this.config = config;
            }
            setRPC(rpc) {
                this.rpc = rpc;
            }
            get currentRPC() {
                return this.rpc;
            }
            setAccount(account) {
                this.account = account;
            }
            callABI(contract, abi, args) {
                const tx = new transaction_1.Transaction({
                    chainId: __classPrivateFieldGet(IWalletAdapterPack, _a, "f", _IWalletAdapterPack_chainId),
                    gasLimit: this.config.gasLimit,
                });
                tx.addAction(contract, abi, args);
                return JSON.parse(tx.toString());
            }
        };
    }
    static get HTTPProvider() {
        return class HTTPProvider {
            constructor(_host) {
                this._host = _host;
                __classPrivateFieldSet(IWalletAdapterPack, _a, _host, "f", _IWalletAdapterPack_host);
            }
        };
    }
    static get RPC() {
        return class RPC {
            constructor(_provider) {
                this._provider = _provider;
                __classPrivateFieldSet(IWalletAdapterPack, _a, _provider._host, "f", _IWalletAdapterPack_host);
            }
        };
    }
    static get Account() {
        return class Account {
            constructor(name, network) {
                if (typeof name === 'string') {
                    this.name = name;
                    if (network) {
                        this.network = network;
                    }
                    else {
                        this.network = getIwalletJS().network;
                    }
                }
                else {
                    this.name = null;
                    this.network = null;
                }
                __classPrivateFieldSet(IWalletAdapterPack, _a, this.network === 'LOCALNET'
                    ? 1020
                    : this.network === 'TESTNET'
                        ? 1023
                        : this.network === 'MAINNET'
                            ? 1024
                            : 0, "f", _IWalletAdapterPack_chainId);
            }
        };
    }
}
exports.IWalletAdapterPack = IWalletAdapterPack;
_a = IWalletAdapterPack;
_IWalletAdapterPack_host = { value: void 0 };
_IWalletAdapterPack_chainId = { value: void 0 };
const getIwalletJS = () => window['IWalletJS'];
class IWallet {
    get host() {
        return __classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).host;
    }
    get chainId() {
        return __classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).chainId;
    }
    get account() {
        return Object.assign({}, __classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).account);
    }
    set account(account) {
        __classPrivateFieldGet(this, _IWallet_extension, "f").setAccount(Object.assign({}, account));
    }
    get rpc() {
        return new api_1.RPC(__classPrivateFieldGet(this, _IWallet_instances, "a", _IWallet_adapter_get).rpc._provider._host);
    }
    constructor(extension) {
        _IWallet_instances.add(this);
        _IWallet_extension.set(this, void 0);
        __classPrivateFieldSet(this, _IWallet_extension, extension, "f");
    }
    static async connect() {
        const extension = getIwalletJS();
        if (!extension) {
            throw new Error('iwallet not installed');
        }
        if (!__classPrivateFieldGet(this, _b, "f", _IWallet_instance)) {
            try {
                await extension.enable();
            }
            catch (error) {
                throw new Error('iwallet locked');
            }
            __classPrivateFieldSet(this, _b, new IWallet(extension), "f", _IWallet_instance);
        }
        return __classPrivateFieldGet(this, _b, "f", _IWallet_instance);
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
_b = IWallet, _IWallet_extension = new WeakMap(), _IWallet_instances = new WeakSet(), _IWallet_adapter_get = function _IWallet_adapter_get() {
    return __classPrivateFieldGet(this, _IWallet_extension, "f").newIOST(new IWalletAdapterPack());
};
_IWallet_instance = { value: void 0 };
//# sourceMappingURL=iwallet.js.map