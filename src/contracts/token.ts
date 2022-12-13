import { OfficialContract } from './official-contract';

export type TokenCreateConfig = {
  decimal: number;
  canTransfer: boolean;
  fullName: string;
};

export class TokenContract extends OfficialContract {
  get id() {
    return 'token.iost';
  }
  create(
    symbol: string,
    issuer: string,
    totalSupply: number,
    config: TokenCreateConfig,
  ) {
    this.call('create', [symbol, issuer, totalSupply, config]);
  }
  issue(symbol: string, to: string, amount: string) {
    this.call('issue', [symbol, to, amount]);
  }
  transfer(
    symbol: string,
    from: string,
    to: string,
    amount: string,
    memo: string,
  ) {
    this.call('transfer', [symbol, from, to, amount, memo]);
  }
  transferFreeze(
    symbol: string,
    from: string,
    to: string,
    amount: string,
    freezeTime: string,
    memo: string,
  ) {
    this.call('transferFreeze', [symbol, from, to, amount, freezeTime, memo]);
  }
  destroy(symbol: string, from: string, amount: string) {
    this.call('destroy', [symbol, from, amount]);
  }
}
