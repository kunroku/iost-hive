import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { RPC, TransactionPending } from '../api';
import { TxInfo } from '../data/info';
import { IOST } from '../iost';
import { Transaction } from '../transaction';

export type Network = 'MAINNET' | 'TESTNET' | 'LOCALNET';

class Callback {
  on: (msg: string, func: (res: any) => void) => Callback;
}

export type IWalletSignAndSend = (tx: Transaction) => Callback;
export type IWalletSignMessage = (message: string) => Callback;

export class IWalletIOSTAdapter {
  signAndSend: IWalletSignAndSend;
  signMessage: IWalletSignMessage;
  rpc: IWalletRPCAdapter;
  account: IWalletAccount;
  setRPC(rpc: IWalletRPCAdapter) {
    this.rpc = rpc;
  }
  setAccount(account: IWalletAccountAdapter) {
    this.account = account;
  }
}
class IWalletHTTPProviderAdapter {
  constructor(public host: string) {}
}
class IWalletRPCAdapter {
  constructor(public provider: IWalletHTTPProviderAdapter) {}
}
export type IWalletAccount = {
  name: string;
  network: Network;
};
class IWalletAccountAdapter implements IWalletAccount {
  constructor(public name: string, public network: Network) {}
}
type IWalletAdapterPack = {
  IOST: typeof IWalletIOSTAdapter;
  HTTPProvider: typeof IWalletHTTPProviderAdapter;
  RPC: typeof IWalletRPCAdapter;
  Account: typeof IWalletAccountAdapter;
};

const createIwalletAdapterPack = () => ({
  IOST: IWalletIOSTAdapter,
  HTTPProvider: IWalletHTTPProviderAdapter,
  RPC: IWalletRPCAdapter,
  Account: IWalletAccountAdapter,
});

type IWalletExtension = {
  account: IWalletAccountAdapter;
  enable: () => Promise<string>;
  IOST: IWalletIOSTAdapter;
  network: Network;
  newIOST: (pack: IWalletAdapterPack) => IWalletIOSTAdapter;
  rpc: IWalletRPCAdapter;
  setAccount: (param: IWalletAccount) => void;
};

const getIwalletJS = () => window['IWalletJS'] as IWalletExtension | undefined;

export type IWalletTransactionEvents = {
  pending: (res: TransactionPending) => void;
  success: (res: TxInfo) => void;
  failed: (error: { message: string }) => void;
};

export type IWalletTransactionHandlerStatus = 'pending' | 'success' | 'failed';

export type IWalletSignature = {
  algorithm: string;
  public_key: string;
  signature: string;
  message: string;
};

export type IWalletSignEvents = {
  pending: () => void;
  success: (res: IWalletSignature) => void;
  failed: (error: { message: string }) => void;
};
export type IWalletSignHandlerStatus = 'pending' | 'success' | 'failed';

export class IWallet {
  static #instance: IWallet;
  #extension: IWalletExtension;
  get iost() {
    return new IOST({
      host: this.#adapter.rpc.provider.host,
      chainId:
        this.account.network === 'LOCALNET'
          ? 1020
          : this.account.network === 'MAINNET'
          ? 1024
          : 1023,
    });
  }
  get #adapter() {
    return this.#extension.newIOST(createIwalletAdapterPack());
  }
  get account() {
    return { ...this.#adapter.account };
  }
  set account(account: IWalletAccount) {
    this.#extension.setAccount({ ...account });
  }
  get rpc() {
    return new RPC(this.#adapter.rpc.provider.host);
  }
  private constructor(extension: IWalletExtension) {
    this.#extension = extension;
  }
  static async connect() {
    const extension = getIwalletJS();
    if (!extension) {
      throw new Error('iwallet not installed');
    }
    if (!this.#instance) {
      try {
        await extension.enable();
      } catch (error) {
        throw new Error('iwallet locked');
      }
      this.#instance = new IWallet(extension);
    }
    return this.#instance;
  }
  signAndSend(tx: Transaction) {
    const event: StrictEventEmitter<EventEmitter, IWalletTransactionEvents> =
      new EventEmitter();
    const handler = this.#adapter.signAndSend(tx);
    handler.on('pending', (res) => event.emit('pending', res));
    handler.on('success', (res) => event.emit('success', res));
    handler.on('failed', (res) => event.emit('failed', res));
    return event;
  }
  async signAndSendAsync(tx: Transaction): Promise<TxInfo> {
    const event = this.signAndSend(tx);
    return await new Promise((resolve, reject) => {
      event.on('success', (res) => {
        resolve(res);
      });
      event.on('failed', (res) => {
        reject(res);
      });
    });
  }
  signMessage(message: string) {
    const event: StrictEventEmitter<EventEmitter, IWalletSignEvents> =
      new EventEmitter();
    const handler = this.#adapter.signMessage(message);
    handler.on('pending', () => event.emit('pending'));
    handler.on('success', (res) => event.emit('success', res));
    handler.on('failed', (res) => event.emit('failed', res));
    return event;
  }
  async signMessageAsync(message: string): Promise<IWalletSignature> {
    const event = this.signMessage(message);
    return await new Promise((resolve, reject) => {
      event.on('success', (res) => {
        resolve(res);
      });
      event.on('failed', (res) => {
        reject(res);
      });
    });
  }
  setAccount(account: IWalletAccount) {
    this.account = account;
  }
}
