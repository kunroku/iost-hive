import { OfficialContract } from './official-contract';

export class RAMContract extends OfficialContract {
  get id() {
    return 'ram.iost';
  }
  buy(payer: string, receiver: string, amount: string) {
    this.call('buy', [payer, receiver, amount]);
  }
  sell(seller: string, receiver: string, amount: string) {
    this.call('sell', [seller, receiver, amount]);
  }
  lend(from: string, to: string, amount: string) {
    this.call('lend', [from, to, amount]);
  }
}
