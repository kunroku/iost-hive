"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractTransactions = void 0;
const auth_1 = require("./auth");
const gas_1 = require("./gas");
const ram_1 = require("./ram");
const system_1 = require("./system");
const token_1 = require("./token");
const token721_1 = require("./token721");
const vote_producer_1 = require("./vote-producer");
const vote_1 = require("./vote");
class ContractTransactions {
    constructor(_tx) {
        this._tx = _tx;
    }
    get auth() {
        return new auth_1.AuthContractTransaction(this._tx);
    }
    get gas() {
        return new gas_1.GASContractTransaction(this._tx);
    }
    get ram() {
        return new ram_1.RAMContractTransaction(this._tx);
    }
    get system() {
        return new system_1.SystemContractTransaction(this._tx);
    }
    get token() {
        return new token_1.TokenContractTransaction(this._tx);
    }
    get token721() {
        return new token721_1.Token721ContractTransaction(this._tx);
    }
    get vote_producer() {
        return new vote_producer_1.VoteProducerContractTransaction(this._tx);
    }
    get vote() {
        return new vote_1.VoteContractTransaction(this._tx);
    }
}
exports.ContractTransactions = ContractTransactions;
//# sourceMappingURL=contracts.js.map