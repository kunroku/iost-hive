"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemContractTransaction = void 0;
const contract_1 = require("./contract");
class SystemContractTransaction extends contract_1.AbstractContractTransaction {
    constructor() {
        super(...arguments);
        this.id = 'system.iost';
    }
    setCode(source, abi) {
        const data = { code: source, info: abi };
        this.call('setCode', [JSON.stringify(data)]);
    }
    updateCode(source, abi, contractId) {
        const data = { ID: contractId, code: source, info: abi };
        this.call('updateCode', [JSON.stringify(data)]);
    }
    cancelDelaytx(hash) {
        this.call('cancelDelaytx', [hash]);
    }
    receipt(data) {
        this.call('receipt', [data]);
    }
}
exports.SystemContractTransaction = SystemContractTransaction;
//# sourceMappingURL=system.js.map