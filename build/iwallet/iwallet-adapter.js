"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOSTAdapter = exports.RPCAdapter = exports.HTTPProviderAdapter = exports.AccountAdapter = void 0;
const transaction_1 = require("../transaction/transaction");
const iwallet_extension_1 = require("./iwallet-extension");
class AccountAdapter extends iwallet_extension_1.AbstractAccountAdapter {
    get network() {
        const iwalletjs = (0, iwallet_extension_1.getIwalletJS)();
        return iwalletjs.network;
    }
}
exports.AccountAdapter = AccountAdapter;
class HTTPProviderAdapter extends iwallet_extension_1.AbstractHTTPProviderAdapter {
}
exports.HTTPProviderAdapter = HTTPProviderAdapter;
class RPCAdapter extends iwallet_extension_1.AbstractRPCAdapter {
    constructor(_provider) {
        super(_provider);
    }
}
exports.RPCAdapter = RPCAdapter;
class Callback {
}
class IOSTAdapter extends iwallet_extension_1.AbstractIOSTAdapter {
    get network() {
        return (0, iwallet_extension_1.getIwalletJS)().network;
    }
    get chainId() {
        return this.network === 'LOCALNET'
            ? 1020
            : this.network === 'TESTNET'
                ? 1023
                : this.network === 'MAINNET'
                    ? 1024
                    : 0;
    }
    get host() {
        return (0, iwallet_extension_1.getIwalletJS)().rpc._provider._host;
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
            chainId: this.chainId,
            gasLimit: this.config.gasLimit,
        });
        tx.addAction(contract, abi, args);
        return JSON.parse(tx.toString());
    }
}
exports.IOSTAdapter = IOSTAdapter;
//# sourceMappingURL=iwallet-adapter.js.map