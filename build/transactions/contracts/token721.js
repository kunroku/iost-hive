"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token721 = void 0;
const contract_1 = require("./contract");
class Token721 extends contract_1.AbstractContractTransaction {
    constructor() {
        super(...arguments);
        this.id = 'token721.iost';
    }
    create(tokenSymbol, issuer, totalSupply) {
        this.call('create', [tokenSymbol, issuer, totalSupply]);
    }
    issue(tokenSymbol, to, metadata) {
        this.call('issue', [tokenSymbol, to, metadata]);
    }
    transfer(tokenSymbol, from, to, tokenId, memo) {
        this.call('transfer', [tokenSymbol, from, to, tokenId, memo]);
    }
    destroy(tokenSymbol, from, amount) {
        this.call('destroy', [tokenSymbol, from, amount]);
    }
}
exports.Token721 = Token721;
//# sourceMappingURL=token721.js.map