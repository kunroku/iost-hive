import { ContractInterface } from './contract-interface';

export type TokenCreateConfig = {
  decimal: number;
  canTransfer: boolean;
  fullName: string;
};

export class TokenContract extends ContractInterface {
  get id() {
    return 'token.iost';
  }
  create(
    symbol: string,
    issuer: string,
    totalSupply: number,
    config: TokenCreateConfig,
  ) {
    this._call('create', [symbol, issuer, totalSupply, config]);
  }
  issue(symbol: string, to: string, amount: string) {
    this._call('issue', [symbol, to, amount]);
  }
  transfer(
    symbol: string,
    from: string,
    to: string,
    amount: string,
    memo: string,
  ) {
    this._call('transfer', [symbol, from, to, amount, memo]);
  }
  transferFreeze(
    symbol: string,
    from: string,
    to: string,
    amount: string,
    freezeTime: string,
    memo: string,
  ) {
    this._call('transferFreeze', [symbol, from, to, amount, freezeTime, memo]);
  }
  destroy(symbol: string, from: string, amount: string) {
    this._call('destroy', [symbol, from, amount]);
  }
}
