import { OfficialContract } from './official-contract';

export class BonusContract extends OfficialContract {
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
