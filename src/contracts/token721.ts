import { ContractInterface } from './contract-interface';

export class Token721Contract extends ContractInterface {
  get id() {
    return 'token721.iost';
  }
  create(symbol: string, issuer: string, totalSupply: number) {
    this._call('create', [symbol, issuer, totalSupply]);
  }
  issue(symbol: string, to: string, metadata: string) {
    this._call('issue', [symbol, to, metadata]);
  }
  transfer(
    symbol: string,
    from: string,
    to: string,
    tokenId: string,
    memo: string,
  ) {
    this._call('transfer', [symbol, from, to, tokenId, memo]);
  }
  destroy(symbol: string, from: string, amount: string) {
    this._call('destroy', [symbol, from, amount]);
  }
}
