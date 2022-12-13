"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _OfficialContracts_tx;
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
    constructor(tx) {
        _OfficialContracts_tx.set(this, void 0);
        __classPrivateFieldSet(this, _OfficialContracts_tx, tx, "f");
    }
    get auth() {
        return new auth_1.AuthContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get bonus() {
        return new bonus_1.BonusContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get exchange() {
        return new exchange_1.ExchangeContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get gas() {
        return new gas_1.GASContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get ram() {
        return new ram_1.RAMContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get system() {
        return new system_1.SystemContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get token() {
        return new token_1.TokenContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get token721() {
        return new token721_1.Token721Contract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get vote_producer() {
        return new vote_producer_1.VoteProducerContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
    get vote() {
        return new vote_1.VoteContract(__classPrivateFieldGet(this, _OfficialContracts_tx, "f"));
    }
}
exports.OfficialContracts = OfficialContracts;
_OfficialContracts_tx = new WeakMap();
//# sourceMappingURL=official-contracts.js.map