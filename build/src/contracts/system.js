"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemContract = void 0;
const official_contract_1 = require("./official-contract");
class SystemContract extends official_contract_1.OfficialContract {
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
exports.SystemContract = SystemContract;
//# sourceMappingURL=system.js.map