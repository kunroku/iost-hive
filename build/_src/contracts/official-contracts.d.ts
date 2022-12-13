import { Transaction } from '../transaction/transaction';
import { AuthContract } from './auth';
import { BonusContract } from './bonus';
import { ExchangeContract } from './exchange';
import { GASContract } from './gas';
import { RAMContract } from './ram';
import { SystemContract } from './system';
import { TokenContract } from './token';
import { Token721Contract } from './token721';
import { VoteProducerContract } from './vote-producer';
import { VoteContract } from './vote';
export declare class OfficialContracts {
    #private;
    constructor(tx: Transaction);
    get auth(): AuthContract;
    get bonus(): BonusContract;
    get exchange(): ExchangeContract;
    get gas(): GASContract;
    get ram(): RAMContract;
    get system(): SystemContract;
    get token(): TokenContract;
    get token721(): Token721Contract;
    get vote_producer(): VoteProducerContract;
    get vote(): VoteContract;
}
