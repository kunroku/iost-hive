import { ContractInterface } from './contract-interface';

export class VoteProducerContract extends ContractInterface {
  get id() {
    return 'vote_producer.iost';
  }
  initProducer(proID: string, proPubkey: string) {
    this.call('initProducer', [proID, proPubkey]);
  }
  initAdmin(adminID: string) {
    this.call('initAdmin', [adminID]);
  }
  applyRegister(
    account: string,
    pubkey: string,
    loc: string,
    url: string,
    netId: string,
    isProducer: boolean,
  ) {
    this.call('applyRegister', [account, pubkey, loc, url, netId, isProducer]);
  }
  applyUnregister(account: string) {
    this.call('applyUnregister', [account]);
  }
  approveRegister(account: string) {
    this.call('approveRegister', [account]);
  }
  approveUnregister(account: string) {
    this.call('approveUnregister', [account]);
  }
  forceUnregister(account: string) {
    this.call('forceUnregister', [account]);
  }
  unregister(account: string) {
    this.call('unregister', [account]);
  }
  updateProducer(
    account: string,
    pubkey: string,
    loc: string,
    url: string,
    netId: string,
  ) {
    this.call('updateProducer', [account, pubkey, loc, url, netId]);
  }
  getProducer(account: string) {
    this.call('getProducer', [account]);
  }
  logInProducer(account: string) {
    this.call('logInProducer', [account]);
  }
  logOutProducer(account: string) {
    this.call('logOutProducer', [account]);
  }
  vote(voter: string, producer: string, amount: string) {
    this.call('vote', [voter, producer, amount]);
  }
  unvote(voter: string, producer: string, amount: string) {
    this.call('unvote', [voter, producer, amount]);
  }
  getVote(voter: string) {
    this.call('getVote', [voter]);
  }
  topupVoterBonus(account: string, amount: string, payer: string) {
    this.call('topupVoterBonus', [account, amount, payer]);
  }
  topupCandidateBonus(amount: string, payer: string) {
    this.call('topupCandidateBonus', [amount, payer]);
  }
  getVoterBonus(voter: string) {
    this.call('getVoterBonus', [voter]);
  }
  voterWithdraw(voter: string) {
    this.call('voterWithdraw', [voter]);
  }
  getCandidateBonus(account: string) {
    this.call('getCandidateBonus', [account]);
  }
  candidateWithdraw(account: string) {
    this.call('candidateWithdraw', [account]);
  }
  stat() {
    this.call('stat', []);
  }
}
