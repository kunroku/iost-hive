"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficialContracts = void 0;
const auth_1 = require("./auth");
const bonus_1 = require("./bonus");
const exchange_1 = require("./exchange");
const gas_1 = require("./gas");
const ram_1 = require("./ram");
const system_1 = require("./system");
const token_1 = require("./token");
const token721_1 = require("./token721");
const vote_producer_1 = require("./vote-producer");
const vote_1 = require("./vote");
class OfficialContracts {
    constructor(_tx) {
        this._tx = _tx;
    }
    get auth() {
        return new auth_1.AuthContract(this._tx);
    }
    get bonus() {
        return new bonus_1.BonusContract(this._tx);
    }
    get exchange() {
        return new exchange_1.ExchangeContract(this._tx);
    }
    get gas() {
        return new gas_1.GASContract(this._tx);
    }
    get ram() {
        return new ram_1.RAMContract(this._tx);
    }
    get system() {
        return new system_1.SystemContract(this._tx);
    }
    get token() {
        return new token_1.TokenContract(this._tx);
    }
    get token721() {
        return new token721_1.Token721Contract(this._tx);
    }
    get vote_producer() {
        return new vote_producer_1.VoteProducerContract(this._tx);
    }
    get vote() {
        return new vote_1.VoteContract(this._tx);
    }
}
exports.OfficialContracts = OfficialContracts;
//# sourceMappingURL=contracts.js.map