import { ContractInterface } from './contract-interface';

export class BonusContract extends ContractInterface {
  get id() {
    return 'bonus.iost';
  }
  issueContribute(parent: string) {
    this._call('issueContribute', [{ parent: [parent] }]);
  }
  exchangeIOST(account: string, amount: string) {
    this._call('exchangeIOST', [account, amount]);
  }
}
