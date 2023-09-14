import { ContractInterface } from './contract-interface';

export class BonusContract extends ContractInterface {
  get id() {
    return 'bonus.iost';
  }
  issueContribute(parent: string) {
    this.call('issueContribute', [{ parent: [parent] }]);
  }
  exchangeIOST(account: string, amount: string) {
    this.call('exchangeIOST', [account, amount]);
  }
}
