import { Transaction } from '../tx';
import { AuthContractTransaction } from './auth';
import { GASContractTransaction } from './gas';
import { RAMContractTransaction } from './ram';
import { SystemContractTransaction } from './system';
import { TokenContractTransaction } from './token';
import { Token721ContractTransaction } from './token721';
import { VoteProducerContractTransaction } from './vote-producer';
import { VoteContractTransaction } from './vote';
export declare class ContractTransactions {
    private readonly _tx;
    constructor(_tx: Transaction);
    get auth(): AuthContractTransaction;
    get gas(): GASContractTransaction;
    get ram(): RAMContractTransaction;
    get system(): SystemContractTransaction;
    get token(): TokenContractTransaction;
    get token721(): Token721ContractTransaction;
    get vote_producer(): VoteProducerContractTransaction;
    get vote(): VoteContractTransaction;
}
