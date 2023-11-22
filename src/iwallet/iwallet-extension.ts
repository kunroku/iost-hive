import { Network, TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction/transaction';
import { IOSTAdapterConfig } from './iwallet-adapter';

export abstract class AbstractAccountAdapter {
  abstract network: Network;
  get name() {
    return this._id;
  }
  constructor(public readonly _id: string) {}
}
export abstract class AbstractHTTPProviderAdapter {
  constructor(public readonly _host: string) {}
}
export abstract class AbstractRPCAdapter {
  constructor(public readonly _provider: AbstractHTTPProviderAdapter) {}
}
export interface Callback {
  on: (msg: string, func: (res: any) => void) => Callback;
}
export abstract class AbstractIOSTAdapter {
  constructor(public readonly config: IOSTAdapterConfig) {}
  abstract signAndSend: (tx: Transaction) => Callback;
  abstract signMessage: (message: string) => Callback;
  abstract rpc: AbstractRPCAdapter;
  abstract account: AbstractAccountAdapter;
  abstract setRPC(rpc: AbstractRPCAdapter): void;
  abstract currentRPC: AbstractRPCAdapter;
  abstract setAccount(account: AbstractAccountAdapter): void;
  abstract callABI(
    contract: string,
    abi: string,
    args: TransactionArgumentType[],
  ): any;
}
export type IWalletAdapterPackType = {
  IOST: typeof AbstractIOSTAdapter;
  HTTPProvider: typeof AbstractHTTPProviderAdapter;
  RPC: typeof AbstractRPCAdapter;
  Account: typeof AbstractAccountAdapter;
};

export type IWalletExtension = {
  account: AbstractAccountAdapter;
  enable: () => Promise<string>;
  IOST: AbstractIOSTAdapter;
  network: Network;
  newIOST: (pack: IWalletAdapterPackType) => AbstractIOSTAdapter;
  rpc: AbstractRPCAdapter;
  setAccount: (param: AbstractAccountAdapter) => void;
};

export const getIwalletJS = () =>
  window && (window['IWalletJS'] as IWalletExtension | undefined);
