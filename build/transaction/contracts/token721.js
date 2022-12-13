"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token721ContractTransaction = void 0;
const abstract_contract_1 = require("./abstract-contract");
class Token721ContractTransaction extends abstract_contract_1.AbstractContractTransaction {
    constructor() {
        super(...arguments);
        this.id = 'token721.iost';
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
exports.Token721ContractTransaction = Token721ContractTransaction;
//# sourceMappingURL=token721.js.map