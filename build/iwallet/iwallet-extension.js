"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIwalletJS = exports.AbstractIOSTAdapter = exports.AbstractRPCAdapter = exports.AbstractHTTPProviderAdapter = exports.AbstractAccountAdapter = void 0;
class AbstractAccountAdapter {
    get name() {
        return this._id;
    }
    constructor(_id) {
        this._id = _id;
    }
}
exports.AbstractAccountAdapter = AbstractAccountAdapter;
class AbstractHTTPProviderAdapter {
    constructor(_host) {
        this._host = _host;
    }
}
exports.AbstractHTTPProviderAdapter = AbstractHTTPProviderAdapter;
class AbstractRPCAdapter {
    constructor(_provider) {
        this._provider = _provider;
    }
}
exports.AbstractRPCAdapter = AbstractRPCAdapter;
class AbstractIOSTAdapter {
    constructor(config) {
        this.config = config;
    }
}
exports.AbstractIOSTAdapter = AbstractIOSTAdapter;
const getIwalletJS = () => window && window['IWalletJS'];
exports.getIwalletJS = getIwalletJS;
//# sourceMappingURL=iwallet-extension.js.map