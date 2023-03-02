import { IOSTConfig, TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';
import {
  AbstractAccountAdapter,
  AbstractHTTPProviderAdapter,
  AbstractIOSTAdapter,
  AbstractRPCAdapter,
  Callback,
  getIwalletJS,
} from './iwallet-extension';

export class AccountAdapter extends AbstractAccountAdapter {
  get network() {
    const iwalletjs = getIwalletJS();
    return iwalletjs.network;
  }
}
export class HTTPProviderAdapter extends AbstractHTTPProviderAdapter {}
export class RPCAdapter extends AbstractRPCAdapter {
  public readonly _provider: HTTPProviderAdapter;
  constructor(_provider: HTTPProviderAdapter) {
    super(_provider);
  }
}
export type IWalletSignAndSend = (tx: Transaction) => Callback;
export type IWalletSignMessage = (message: string) => Callback;
export type IOSTAdapterConfig = {
  gasPrice: number;
  gasLimit: number;
  delay: number;
};

export class IOSTAdapter extends AbstractIOSTAdapter implements IOSTConfig {
  signAndSend: IWalletSignAndSend;
  signMessage: IWalletSignMessage;
  rpc: RPCAdapter;
  account: AccountAdapter;
  get network() {
    return getIwalletJS().network;
  }
  get chainId() {
    return this.network === 'LOCALNET'
      ? 1020
      : this.network === 'TESTNET'
      ? 1023
      : this.network === 'MAINNET'
      ? 1024
      : 0;
  }
  get host() {
    return getIwalletJS().rpc._provider._host;
  }
  setRPC(rpc: RPCAdapter) {
    this.rpc = rpc;
  }
  get currentRPC() {
    return this.rpc;
  }
  setAccount(account: AccountAdapter) {
    this.account = account;
  }
  callABI(contract: string, abi: string, args: TransactionArgumentType[]) {
    const tx = new Transaction({
      chainId: this.chainId,
      gasLimit: this.config.gasLimit,
    });
    tx.addAction(contract, abi, args);
    return JSON.parse(tx.toString());
  }
}
