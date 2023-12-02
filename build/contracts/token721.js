"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token721Contract = void 0;
const contract_interface_1 = require("./contract-interface");
class Token721Contract extends contract_interface_1.ContractInterface {
    get id() {
        return 'token721.iost';
    }
    create(symbol, issuer, totalSupply) {
        this._call('create', [symbol, issuer, totalSupply]);
    }
    issue(symbol, to, metadata) {
        this._call('issue', [symbol, to, metadata]);
    }
    transfer(symbol, from, to, tokenId, memo) {
        this._call('transfer', [symbol, from, to, tokenId, memo]);
    }
    destroy(symbol, from, amount) {
        this._call('destroy', [symbol, from, amount]);
    }
}
exports.Token721Contract = Token721Contract;
//# sourceMappingURL=token721.js.map