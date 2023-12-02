"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemContract = void 0;
const contract_interface_1 = require("./contract-interface");
class SystemContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'system.iost';
    }
    setCode(source, abi) {
        const data = { code: source, info: abi };
        this._call('setCode', [JSON.stringify(data)]);
    }
    updateCode(source, abi, contractId, data) {
        this._call('updateCode', [
            JSON.stringify({ ID: contractId, code: source, info: abi }),
            data,
        ]);
    }
    cancelDelaytx(hash) {
        this._call('cancelDelaytx', [hash]);
    }
    receipt(data) {
        this._call('receipt', [data]);
    }
}
exports.SystemContract = SystemContract;
//# sourceMappingURL=system.js.map