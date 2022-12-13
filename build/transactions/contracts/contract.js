"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractTransactions = exports.AbstractContractTransaction = void 0;
const auth_1 = require("./auth");
const gas_1 = require("./gas");
const ram_1 = require("./ram");
const system_1 = require("./system");
class AbstractContractTransaction {
    constructor(tx) {
        this.tx = tx;
    }
    call(abi, args) {
        this.tx.addAction(this.id, abi, args);
    }
}
exports.AbstractContractTransaction = AbstractContractTransaction;
class ContractTransactions {
    constructor(tx) {
        this.tx = tx;
        this.auth = new auth_1.AuthContractTransaction(this.tx);
        this.gas = new gas_1.GASContractTransaction(this.tx);
        this.ram = new ram_1.RAMContractTransaction(this.tx);
        this.system = new system_1.SystemContractTransaction(this.tx);
    }
}
exports.ContractTransactions = ContractTransactions;
//# sourceMappingURL=contract.js.map