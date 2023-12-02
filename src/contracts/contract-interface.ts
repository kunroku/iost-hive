import { RPC } from '../api';
import { TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';
import { ContractStorage } from './contract-storage';

export abstract class ContractInterface {
  protected abstract readonly id: string;
  readonly #tx: Transaction;
  constructor(tx: Transaction) {
    this.#tx = tx;
  }
  protected _call(abi: string, args: TransactionArgumentType[]) {
    this.#tx.addAction(this.id, abi, args);
  }
  _storage(rpc: RPC) {
    return new ContractStorage(this.id, rpc);
  }
}
