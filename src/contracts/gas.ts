import { OfficialContract } from './official-contract';

export class GASContract extends OfficialContract {
  get id() {
    return 'gas.iost';
  }
  pledge(pledgor: string, to: string, amount: string) {
    this.call('pledge', [pledgor, to, amount]);
  }
  unpledge(pledgor: string, from: string, amount: string) {
    this.call('pledge', [pledgor, from, amount]);
  }
}
