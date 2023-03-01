import { EventEmitter } from 'events';
import StrictEventEmitter from 'strict-event-emitter-types';
import { RPC } from '../api';
import { TxReceiptInfo } from '../data/info';
import { IOSTConfig, TransactionArgumentType } from '../data/params';
import { Transaction } from '../transaction';

export type Network = 'MAINNET' | 'TESTNET' | 'LOCALNET';

class Callback {
  on: (msg: string, func: (res: any) => void) => Callback;
}

type IWalletSignAndSend = (tx: Transaction) => Callback;
type IWalletSignMessage = (message: string) => Callback;

type IOSTAdapterConfig = {
  gasPrice: number;
  gasLimit: number;
  delay: number;
};

type HTTPProviderAdapter = {
  _host: string;
};

type RPCAdapter = {
  _provider: HTTPProviderAdapter;
};
type IOSTAdapter = {
  signAndSend: IWalletSignAndSend;
  signMessage: IWalletSignMessage;
  rpc: RPCAdapter;
  account: IWalletAccount;
  host: string;
  chainId: number;
  setRPC(rpc: RPCAdapter): void;
  currentRPC: RPCAdapter;
  setAccount(account: IWalletAccount): void;
  callABI(contract: string, abi: string, args: TransactionArgumentType[]): any;
};

class IWalletAdapterPack {
  static #host: string;
  static #chainId: number;
  static get IOST() {
    return class IOST implements IOSTAdapter {
      signAndSend: IWalletSignAndSend;
      signMessage: IWalletSignMessage;
      rpc: RPCAdapter;
      account: IWalletAccount;
      get host() {
        return IWalletAdapterPack.#host;
      }
      get chainId() {
        return IWalletAdapterPack.#chainId;
      }
      constructor(public config: IOSTAdapterConfig) {}
      setRPC(rpc: RPCAdapter) {
        this.rpc = rpc;
      }
      get currentRPC() {
        return this.rpc;
      }
      setAccount(account: IWalletAccount) {
        this.account = account;
      }
      callABI(contract: string, abi: string, args: TransactionArgumentType[]) {
        const tx = new Transaction({
          chainId: IWalletAdapterPack.#chainId,
          gasLimit: this.config.gasLimit,
        });
        tx.addAction(contract, abi, args);
        return JSON.parse(tx.toString());
      }
    };
  }
  static get HTTPProvider() {
    return class HTTPProvider implements HTTPProviderAdapter {
      constructor(public _host: string) {
        IWalletAdapterPack.#host = _host;
      }
    };
  }
  static get RPC() {
    return class RPC {
      constructor(public _provider: HTTPProviderAdapter) {
        IWalletAdapterPack.#host = _provider._host;
      }
    };
  }
  static get Account() {
    return class Account implements IWalletAccount {
      name: string;
      network: Network;
      constructor(name: string, network: Network) {
        if (typeof name === 'string') {
          this.name = name;
          if (network) {
            this.network = network;
          } else {
            this.network = getIwalletJS().network;
          }
        } else {
          this.name = null;
          this.network = null;
        }
        IWalletAdapterPack.#chainId =
          this.network === 'LOCALNET'
            ? 1020
            : this.network === 'TESTNET'
            ? 1023
            : this.network === 'MAINNET'
            ? 1024
            : 0;
      }
    };
  }
}

// class IWalletIOSTAdapter {
//   signAndSend: IWalletSignAndSend;
//   signMessage: IWalletSignMessage;
//   rpc: IWalletRPCAdapter;
//   account: IWalletAccount;
//   get host() {
//     return this.rpc._provider._host;
//   }
//   get chainId() {
//     return this.account.network === 'LOCALNET'
//       ? 1020
//       : this.account.network === 'TESTNET'
//       ? 1023
//       : this.account.network === 'MAINNET'
//       ? 1024
//       : 0;
//   }
//   setRPC(rpc: IWalletRPCAdapter) {
//     this.rpc = rpc;
//   }
//   get currentRPC() {
//     return this.rpc;
//   }
//   setAccount(account: IWalletAccountAdapter) {
//     this.account = account;
//   }
//   callABI(contract: string, abi: string, args: TransactionArgumentType[]) {
//     const tx = new Transaction({ chainId: this.chainId });
//     tx.addAction(contract, abi, args);
//     return JSON.parse(tx.toString());
//   }
// }
// class IWalletHTTPProviderAdapter {
//   constructor(public _host: string) {}
// }
// class IWalletRPCAdapter {
//   constructor(public _provider: IWalletHTTPProviderAdapter) {}
// }
export type IWalletAccount = {
  name: string;
  network: Network;
};
// class IWalletAccountAdapter implements IWalletAccount {
//   name: string;
//   network: Network;
//   constructor(name: string, network: Network) {
//     if (typeof name === 'string') {
//       this.name = name;
//       if (network) {
//         this.network = network;
//       } else {
//         this.network = getIwalletJS().network;
//       }
//     } else {
//       this.name = null;
//       this.network = null;
//     }
//   }
// }
// type IWalletAdapterPack = {
//   IOST: typeof IWalletIOSTAdapter;
//   HTTPProvider: typeof IWalletHTTPProviderAdapter;
//   RPC: typeof IWalletRPCAdapter;
//   Account: typeof IWalletAccountAdapter;
// };

// const createIwalletAdapterPack = () => ({
//   IOST: IWalletIOSTAdapter,
//   HTTPProvider: IWalletHTTPProviderAdapter,
//   RPC: IWalletRPCAdapter,
//   Account: IWalletAccountAdapter,
// });

type IWalletExtension = {
  account: IWalletAccount;
  enable: () => Promise<string>;
  IOST: IOSTAdapter;
  network: Network;
  newIOST: (pack: IWalletAdapterPack) => IOSTAdapter;
  rpc: RPCAdapter;
  setAccount: (param: IWalletAccount) => void;
};

const getIwalletJS = () => window['IWalletJS'] as IWalletExtension | undefined;

type IWalletTransactionEvents = {
  pending: (tx_hash: string) => void;
  success: (res: TxReceiptInfo) => void;
  failed: (error: { message: string }) => void;
};

export type IWalletSignature = {
  algorithm: string;
  public_key: string;
  signature: string;
  message: string;
};

type IWalletSignEvents = {
  pending: () => void;
  success: (res: IWalletSignature) => void;
  failed: (error: { message: string }) => void;
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
    return this.#extension.newIOST(IWalletAdapterPack);
  }
  get account() {
    return { ...this.#adapter.account };
  }
  set account(account: IWalletAccount) {
    this.#extension.setAccount({ ...account });
  }
  get rpc() {
    return new RPC(this.host);
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
  setAccount(account: IWalletAccount) {
    this.account = account;
  }
}
