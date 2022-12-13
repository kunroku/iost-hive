import { OfficialContract } from './official-contract';

export class Token721Contract extends OfficialContract {
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
