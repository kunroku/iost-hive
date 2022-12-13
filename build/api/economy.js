"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyRPC = void 0;
const abstract_rpc_1 = require("./abstract-rpc");
class EconomyRPC extends abstract_rpc_1.AbstractRPC {
    async getGasRatio() {
        const url = 'getGasRatio';
        return await this.get(url);
    }
    async getRAMInfo() {
        const url = 'getRAMInfo';
        return await this.get(url);
    }
}
exports.EconomyRPC = EconomyRPC;
//# sourceMappingURL=economy.js.map