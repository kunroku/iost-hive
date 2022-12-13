import { TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';

export abstract class OfficialContract {
  protected abstract readonly id: string;
  readonly #tx: Transaction;
  constructor(tx: Transaction) {
    this.#tx = tx;
  }
  protected call(abi: string, args: TransactionArgumentType[]) {
    this.#tx.addAction(this.id, abi, args);
  }
}
