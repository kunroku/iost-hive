import { ContractInterface } from './contract-interface';

export class GASContract extends ContractInterface {
  get id() {
    return 'gas.iost';
  }
  pledge(pledgor: string, to: string, amount: string) {
    this._call('pledge', [pledgor, to, amount]);
  }
  unpledge(pledgor: string, from: string, amount: string) {
    this._call('pledge', [pledgor, from, amount]);
  }
}
