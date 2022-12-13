"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetRPC = void 0;
const abstract_rpc_1 = require("./abstract-rpc");
class NetRPC extends abstract_rpc_1.AbstractRPC {
    async getNodeInfo() {
        const url = 'getNodeInfo';
        return await this.get(url);
    }
}
exports.NetRPC = NetRPC;
//# sourceMappingURL=net.js.map