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

export class OfficialContracts {
  readonly #tx: Transaction;
  constructor(tx: Transaction) {
    this.#tx = tx;
  }
  get auth() {
    return new AuthContract(this.#tx);
  }
  get bonus() {
    return new BonusContract(this.#tx);
  }
  get exchange() {
    return new ExchangeContract(this.#tx);
  }
  get gas() {
    return new GASContract(this.#tx);
  }
  get ram() {
    return new RAMContract(this.#tx);
  }
  get system() {
    return new SystemContract(this.#tx);
  }
  get token() {
    return new TokenContract(this.#tx);
  }
  get token721() {
    return new Token721Contract(this.#tx);
  }
  get vote_producer() {
    return new VoteProducerContract(this.#tx);
  }
  get vote() {
    return new VoteContract(this.#tx);
  }
}
