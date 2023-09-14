import { ContractInterface } from './contract-interface';

export type VoteInfo = {
  resultNumber?: number;
  minVote?: number;
  options?: string[];
  canVote?: boolean;
  anyOption?: boolean;
  freezeTime?: number;
};

export class VoteContract extends ContractInterface {
  get id() {
    return 'vote.iost';
  }
  newVote(owner: string, description: string, info: VoteInfo) {
    this.call('newVote', [owner, description, info]);
  }
  setCanVote(voteId: string, canVote: boolean) {
    this.call('setCanVote', [voteId, canVote]);
  }
  setFreezeTime(voteId: string, freezeTime: number) {
    this.call('setFreezeTime', [voteId, freezeTime]);
  }
  addOption(voteId: string, option: string, clearVote: boolean) {
    this.call('addOption', [voteId, option, clearVote]);
  }
  removeOption(voteId: string, option: string, force: boolean) {
    this.call('removeOption', [voteId, option, force]);
  }
  getOption(voteId: string, option: string) {
    this.call('getOption', [voteId, option]);
  }
  vote(voteId: string, account: string, option: string, amount: string) {
    this.call('vote', [voteId, account, option, amount]);
  }
  unvote(voteId: string, account: string, option: string, amount: string) {
    this.call('unvote', [voteId, account, option, amount]);
  }
  getVote(voteId: string, account: string) {
    this.call('getVote', [voteId, account]);
  }
  getResult(voteId: string) {
    this.call('voteId', [voteId]);
  }
  delVote(voteId: string) {
    this.call('delVote', [voteId]);
  }
}
