import { ContractInterface } from './contract-interface';

export class RAMContract extends ContractInterface {
  get id() {
    return 'ram.iost';
  }
  buy(payer: string, receiver: string, amount: number) {
    this._call('buy', [payer, receiver, amount]);
  }
  sell(seller: string, receiver: string, amount: number) {
    this._call('sell', [seller, receiver, amount]);
  }
  lend(from: string, to: string, amount: number) {
    this._call('lend', [from, to, amount]);
  }
}
