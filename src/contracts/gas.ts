import { ContractInterface } from './contract-interface';

export class GASContract extends ContractInterface {
  get id() {
    return 'gas.iost';
  }
  pledge(pledger: string, to: string, amount: string) {
    this._call('pledge', [pledger, to, amount]);
  }
  unpledge(pledger: string, from: string, amount: string) {
    this._call('unpledge', [pledger, from, amount]);
  }
}
