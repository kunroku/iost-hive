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
var _NetworkManager_networks, _NetworkManager_network;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkManager = void 0;
const iost_1 = require("../iost");
class NetworkManager {
    get network() {
        return __classPrivateFieldGet(this, _NetworkManager_network, "f");
    }
    set network(network) {
        __classPrivateFieldSet(this, _NetworkManager_network, network, "f");
    }
    get networks() {
        return JSON.parse(JSON.stringify(this.networks));
    }
    get iost() {
        return new iost_1.IOST(__classPrivateFieldGet(this, _NetworkManager_networks, "f")[this.network]);
    }
    constructor(networks, network) {
        _NetworkManager_networks.set(this, void 0);
        _NetworkManager_network.set(this, void 0);
        __classPrivateFieldSet(this, _NetworkManager_networks, JSON.parse(JSON.stringify(networks)), "f");
        __classPrivateFieldSet(this, _NetworkManager_network, network, "f");
    }
    update(network, config) {
        __classPrivateFieldGet(this, _NetworkManager_networks, "f")[network] = config;
    }
    add(config) {
        __classPrivateFieldGet(this, _NetworkManager_networks, "f").push(config);
    }
    remove(network) {
        if (__classPrivateFieldGet(this, _NetworkManager_networks, "f")[network]) {
            __classPrivateFieldSet(this, _NetworkManager_network, 0, "f");
            __classPrivateFieldGet(this, _NetworkManager_networks, "f").splice(network, 1);
        }
    }
}
exports.NetworkManager = NetworkManager;
_NetworkManager_networks = new WeakMap(), _NetworkManager_network = new WeakMap();
//# sourceMappingURL=network-manager.js.map