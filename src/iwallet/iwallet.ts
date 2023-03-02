import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { Account } from '../account';
import { HTTPProvider, RPC } from '../api';
import { TxReceiptInfo } from '../data/info';
import { IOSTConfig } from '../data/params';
import { Transaction } from '../transaction/transaction';
import { AccountAdapter, IOSTAdapter } from './iwallet-adapter';
import {
  getIwalletJS,
  IWalletAdapterPackType,
  IWalletExtension,
} from './iwallet-extension';

export type IWalletSignature = {
  algorithm: string;
  public_key: string;
  signature: string;
  message: string;
};

export type IWalletTransactionEvents = {
  pending: (tx_hash: string) => void;
  success: (res: TxReceiptInfo) => void;
  failed: (error: { message: string }) => void;
};

export type IWalletSignEvents = {
  pending: () => void;
  success: (res: IWalletSignature) => void;
  failed: (error: { message: string }) => void;
};
export const IWALLET_ADAPTER_PACK: IWalletAdapterPackType = {
  IOST: IOSTAdapter,
  HTTPProvider: HTTPProvider,
  RPC: RPC,
  Account: Account,
};
export class IWallet implements IOSTConfig {
  static #instance: IWallet;
  get host() {
    return this.#adapter.host;
  }
  get chainId() {
    return this.#adapter.chainId;
  }
  #extension: IWalletExtension;
  get #adapter() {
    return this.#extension.newIOST(IWALLET_ADAPTER_PACK) as IOSTAdapter;
  }
  get account() {
    return this.#adapter.account;
  }
  set account(account: AccountAdapter) {
    this.#extension.setAccount(account);
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
    const handler = this.#adapter.signAndSend(JSON.parse(tx.toString()));
    handler.on('pending', (res) => event.emit('pending', res));
    handler.on('success', (res) => event.emit('success', res));
    handler.on('failed', (res) => event.emit('failed', res));
    return event;
  }
  async signAndSendAsync(tx: Transaction): Promise<TxReceiptInfo> {
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
  setAccount(account: Account) {
    this.account = account;
  }
}
