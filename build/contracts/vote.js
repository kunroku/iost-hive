"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteContract = void 0;
const contract_interface_1 = require("./contract-interface");
class VoteContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'vote.iost';
    }
    newVote(owner, description, info) {
        this._call('newVote', [owner, description, info]);
    }
    setCanVote(voteId, canVote) {
        this._call('setCanVote', [voteId, canVote]);
    }
    setFreezeTime(voteId, freezeTime) {
        this._call('setFreezeTime', [voteId, freezeTime]);
    }
    addOption(voteId, option, clearVote) {
        this._call('addOption', [voteId, option, clearVote]);
    }
    removeOption(voteId, option, force) {
        this._call('removeOption', [voteId, option, force]);
    }
    getOption(voteId, option) {
        this._call('getOption', [voteId, option]);
    }
    vote(voteId, account, option, amount) {
        this._call('vote', [voteId, account, option, amount]);
    }
    unvote(voteId, account, option, amount) {
        this._call('unvote', [voteId, account, option, amount]);
    }
    getVote(voteId, account) {
        this._call('getVote', [voteId, account]);
    }
    getResult(voteId) {
        this._call('voteId', [voteId]);
    }
    delVote(voteId) {
        this._call('delVote', [voteId]);
    }
}
exports.VoteContract = VoteContract;
//# sourceMappingURL=vote.js.map