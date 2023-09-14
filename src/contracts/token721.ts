import { ContractInterface } from './contract-interface';

export class Token721Contract extends ContractInterface {
  get id() {
    return 'token721.iost';
  }
  create(symbol: string, issuer: string, totalSupply: number) {
    this.call('create', [symbol, issuer, totalSupply]);
  }
  issue(symbol: string, to: string, metadata: string) {
    this.call('issue', [symbol, to, metadata]);
  }
  transfer(
    symbol: string,
    from: string,
    to: string,
    tokenId: string,
    memo: string,
  ) {
    this.call('transfer', [symbol, from, to, tokenId, memo]);
  }
  destroy(symbol: string, from: string, amount: string) {
    this.call('destroy', [symbol, from, amount]);
  }
}
