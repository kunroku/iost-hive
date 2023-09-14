import { ContractInterface } from './contract-interface';
export type VoteInfo = {
    resultNumber?: number;
    minVote?: number;
    options?: string[];
    canVote?: boolean;
    anyOption?: boolean;
    freezeTime?: number;
};
export declare class VoteContract extends ContractInterface {
    get id(): string;
    newVote(owner: string, description: string, info: VoteInfo): void;
    setCanVote(voteId: string, canVote: boolean): void;
    setFreezeTime(voteId: string, freezeTime: number): void;
    addOption(voteId: string, option: string, clearVote: boolean): void;
    removeOption(voteId: string, option: string, force: boolean): void;
    getOption(voteId: string, option: string): void;
    vote(voteId: string, account: string, option: string, amount: string): void;
    unvote(voteId: string, account: string, option: string, amount: string): void;
    getVote(voteId: string, account: string): void;
    getResult(voteId: string): void;
    delVote(voteId: string): void;
}
