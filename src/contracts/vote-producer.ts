import { ContractInterface } from './contract-interface';

export class VoteProducerContract extends ContractInterface {
  get id() {
    return 'vote_producer.iost';
  }
  initProducer(proID: string, proPubkey: string) {
    this._call('initProducer', [proID, proPubkey]);
  }
  initAdmin(adminID: string) {
    this._call('initAdmin', [adminID]);
  }
  applyRegister(
    account: string,
    pubkey: string,
    loc: string,
    url: string,
    netId: string,
    isProducer: boolean,
  ) {
    this._call('applyRegister', [account, pubkey, loc, url, netId, isProducer]);
  }
  applyUnregister(account: string) {
    this._call('applyUnregister', [account]);
  }
  approveRegister(account: string) {
    this._call('approveRegister', [account]);
  }
  approveUnregister(account: string) {
    this._call('approveUnregister', [account]);
  }
  forceUnregister(account: string) {
    this._call('forceUnregister', [account]);
  }
  unregister(account: string) {
    this._call('unregister', [account]);
  }
  updateProducer(
    account: string,
    pubkey: string,
    loc: string,
    url: string,
    netId: string,
  ) {
    this._call('updateProducer', [account, pubkey, loc, url, netId]);
  }
  getProducer(account: string) {
    this._call('getProducer', [account]);
  }
  logInProducer(account: string) {
    this._call('logInProducer', [account]);
  }
  logOutProducer(account: string) {
    this._call('logOutProducer', [account]);
  }
  vote(voter: string, producer: string, amount: string) {
    this._call('vote', [voter, producer, amount]);
  }
  unvote(voter: string, producer: string, amount: string) {
    this._call('unvote', [voter, producer, amount]);
  }
  getVote(voter: string) {
    this._call('getVote', [voter]);
  }
  topupVoterBonus(account: string, amount: string, payer: string) {
    this._call('topupVoterBonus', [account, amount, payer]);
  }
  topupCandidateBonus(amount: string, payer: string) {
    this._call('topupCandidateBonus', [amount, payer]);
  }
  getVoterBonus(voter: string) {
    this._call('getVoterBonus', [voter]);
  }
  voterWithdraw(voter: string) {
    this._call('voterWithdraw', [voter]);
  }
  getCandidateBonus(account: string) {
    this._call('getCandidateBonus', [account]);
  }
  candidateWithdraw(account: string) {
    this._call('candidateWithdraw', [account]);
  }
  stat() {
    this._call('stat', []);
  }
}
