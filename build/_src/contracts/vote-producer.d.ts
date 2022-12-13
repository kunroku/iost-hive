import { OfficialContract } from './official-contract';
export declare class VoteProducerContract extends OfficialContract {
    get id(): string;
    initProducer(proID: string, proPubkey: string): void;
    initAdmin(adminID: string): void;
    applyRegister(account: string, pubkey: string, loc: string, url: string, netId: string, isProducer: boolean): void;
    applyUnregister(account: string): void;
    approveRegister(account: string): void;
    approveUnregister(account: string): void;
    forceUnregister(account: string): void;
    unregister(account: string): void;
    updateProducer(account: string, pubkey: string, loc: string, url: string, netId: string): void;
    getProducer(account: string): void;
    logInProducer(account: string): void;
    logOutProducer(account: string): void;
    vote(voter: string, producer: string, amount: string): void;
    unvote(voter: string, producer: string, amount: string): void;
    getVote(voter: string): void;
    topupVoterBonus(account: string, amount: string, payer: string): void;
    topupCandidateBonus(amount: string, payer: string): void;
    getVoterBonus(voter: string): void;
    voterWithdraw(voter: string): void;
    getCandidateBonus(account: string): void;
    candidateWithdraw(account: string): void;
    stat(): void;
}
