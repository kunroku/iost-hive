import { ContractInterface } from './contract-interface';

export class ExchangeContract extends ContractInterface {
  get id() {
    return 'exchange.iost';
  }
  transfer(symbol: string, to: string, amount: string, memo: string) {
    this.call('transfer', [symbol, to, amount, memo]);
  }
  createAccountAndTransfer(
    id: string,
    amount: string,
    ownerKey: string,
    activeKey: string,
  ) {
    this.transfer('iost', '', amount, `create:${id}:${ownerKey}:${activeKey}`);
  }
}
