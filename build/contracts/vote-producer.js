"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteProducerContract = void 0;
const contract_interface_1 = require("./contract-interface");
class VoteProducerContract extends contract_interface_1.ContractInterface {
    get id() {
        return 'vote_producer.iost';
    }
    initProducer(proID, proPubkey) {
        this._call('initProducer', [proID, proPubkey]);
    }
    initAdmin(adminID) {
        this._call('initAdmin', [adminID]);
    }
    applyRegister(account, pubkey, loc, url, netId, isProducer) {
        this._call('applyRegister', [account, pubkey, loc, url, netId, isProducer]);
    }
    applyUnregister(account) {
        this._call('applyUnregister', [account]);
    }
    approveRegister(account) {
        this._call('approveRegister', [account]);
    }
    approveUnregister(account) {
        this._call('approveUnregister', [account]);
    }
    forceUnregister(account) {
        this._call('forceUnregister', [account]);
    }
    unregister(account) {
        this._call('unregister', [account]);
    }
    updateProducer(account, pubkey, loc, url, netId) {
        this._call('updateProducer', [account, pubkey, loc, url, netId]);
    }
    getProducer(account) {
        this._call('getProducer', [account]);
    }
    logInProducer(account) {
        this._call('logInProducer', [account]);
    }
    logOutProducer(account) {
        this._call('logOutProducer', [account]);
    }
    vote(voter, producer, amount) {
        this._call('vote', [voter, producer, amount]);
    }
    unvote(voter, producer, amount) {
        this._call('unvote', [voter, producer, amount]);
    }
    getVote(voter) {
        this._call('getVote', [voter]);
    }
    topupVoterBonus(account, amount, payer) {
        this._call('topupVoterBonus', [account, amount, payer]);
    }
    topupCandidateBonus(amount, payer) {
        this._call('topupCandidateBonus', [amount, payer]);
    }
    getVoterBonus(voter) {
        this._call('getVoterBonus', [voter]);
    }
    voterWithdraw(voter) {
        this._call('voterWithdraw', [voter]);
    }
    getCandidateBonus(account) {
        this._call('getCandidateBonus', [account]);
    }
    candidateWithdraw(account) {
        this._call('candidateWithdraw', [account]);
    }
    stat() {
        this._call('stat', []);
    }
}
exports.VoteProducerContract = VoteProducerContract;
//# sourceMappingURL=vote-producer.js.map