"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteContract = void 0;
const official_contract_1 = require("./official-contract");
class VoteContract extends official_contract_1.OfficialContract {
    constructor() {
        super(...arguments);
        this.id = 'vote.iost';
    }
    newVote(owner, description, info) {
        this.call('newVote', [owner, description, info]);
    }
    setCanVote(voteId, canVote) {
        this.call('setCanVote', [voteId, canVote]);
    }
    setFreezeTime(voteId, freezeTime) {
        this.call('setFreezeTime', [voteId, freezeTime]);
    }
    addOption(voteId, option, clearVote) {
        this.call('addOption', [voteId, option, clearVote]);
    }
    removeOption(voteId, option, force) {
        this.call('removeOption', [voteId, option, force]);
    }
    getOption(voteId, option) {
        this.call('getOption', [voteId, option]);
    }
    vote(voteId, account, option, amount) {
        this.call('vote', [voteId, account, option, amount]);
    }
    unvote(voteId, account, option, amount) {
        this.call('unvote', [voteId, account, option, amount]);
    }
    getVote(voteId, account) {
        this.call('getVote', [voteId, account]);
    }
    getResult(voteId) {
        this.call('voteId', [voteId]);
    }
    delVote(voteId) {
        this.call('delVote', [voteId]);
    }
}
exports.VoteContract = VoteContract;
//# sourceMappingURL=vote.js.map