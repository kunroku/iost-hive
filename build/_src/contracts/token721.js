"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token721Contract = void 0;
const official_contract_1 = require("./official-contract");
class Token721Contract extends official_contract_1.OfficialContract {
    get id() {
        return 'token721.iost';
    }
    create(symbol, issuer, totalSupply) {
        this.call('create', [symbol, issuer, totalSupply]);
    }
    issue(symbol, to, metadata) {
        this.call('issue', [symbol, to, metadata]);
    }
    transfer(symbol, from, to, tokenId, memo) {
        this.call('transfer', [symbol, from, to, tokenId, memo]);
    }
    destroy(symbol, from, amount) {
        this.call('destroy', [symbol, from, amount]);
    }
}
exports.Token721Contract = Token721Contract;
//# sourceMappingURL=token721.js.map