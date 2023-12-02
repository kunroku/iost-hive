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
    this._call('newVote', [owner, description, info]);
  }
  setCanVote(voteId: string, canVote: boolean) {
    this._call('setCanVote', [voteId, canVote]);
  }
  setFreezeTime(voteId: string, freezeTime: number) {
    this._call('setFreezeTime', [voteId, freezeTime]);
  }
  addOption(voteId: string, option: string, clearVote: boolean) {
    this._call('addOption', [voteId, option, clearVote]);
  }
  removeOption(voteId: string, option: string, force: boolean) {
    this._call('removeOption', [voteId, option, force]);
  }
  getOption(voteId: string, option: string) {
    this._call('getOption', [voteId, option]);
  }
  vote(voteId: string, account: string, option: string, amount: string) {
    this._call('vote', [voteId, account, option, amount]);
  }
  unvote(voteId: string, account: string, option: string, amount: string) {
    this._call('unvote', [voteId, account, option, amount]);
  }
  getVote(voteId: string, account: string) {
    this._call('getVote', [voteId, account]);
  }
  getResult(voteId: string) {
    this._call('voteId', [voteId]);
  }
  delVote(voteId: string) {
    this._call('delVote', [voteId]);
  }
}
