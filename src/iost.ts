import { RPC, HTTPProvider } from './api';
import { IOSTConfig, KeyPairPermission } from './data/params';
import { Transaction, TransactionProps } from './transaction/transaction';
import {
  TransactionHandler,
  TransactionHandlerConfig,
} from './transaction/transaction-handler';
import { Wallet } from './wallet';
import { IWallet } from './iwallet';

const defaultConfig: IOSTConfig = {
  host: 'http://localhost:30001',
  chainId: 1020,
};

export class IOST {
  readonly #iwallet: IWallet;
  readonly #config: IOSTConfig;
  #serverTimeDiff = 0;
  get config(): IOSTConfig {
    if (this.#iwallet) {
      const { host, chainId } = this.#iwallet;
      return { host, chainId };
    } else {
      return { ...this.#config };
    }
  }
  get serverTimeDiff() {
    return this.#serverTimeDiff;
  }
  get iwallet() {
    return this.#iwallet;
  }
  get rpc() {
    return new RPC(new HTTPProvider(this.config.host));
  }
  constructor(config: Partial<IOSTConfig> = {}) {
    if (config instanceof IWallet) {
      this.#iwallet = config;
    } else {
      this.#config = { ...defaultConfig, ...config };
    }
  }
  static async connect() {
    const iwallet = await IWallet.connect();
    const iost = new IOST(iwallet);
    return iost;
  }
  async setServerTimeDiff() {
    const requestStartTime = new Date().getTime() * 1e6;
    const nodeInfo = await this.rpc.getNodeInfo();
    const serverTime = Number(nodeInfo.server_time);
    const timeBuffer = 5 * 1e9;
    this.#serverTimeDiff = timeBuffer + serverTime - requestStartTime;
    return this.serverTimeDiff;
  }
  async sign(
    wallet: Wallet,
    tx: Transaction,
    publisher: string,
    signers: { id: string; permission: KeyPairPermission }[],
  ) {
    for (const signer of signers) {
      tx.addSigner(signer.id, signer.permission);
    }
    for (const signer of signers) {
      const signatures = wallet.sign(
        signer.id,
        signer.permission,
        tx.getBaseHash(),
      );
      tx.addSign(signatures);
    }
    if (publisher) {
      const signatures = wallet.sign(publisher, 'active', tx.getPublishHash());
      tx.setPublisher(publisher);
      tx.addPublishSign(signatures);
    }
  }
  createTransaction(props: TransactionProps = {}) {
    const tx = new Transaction({ chainId: this.config.chainId, ...props });
    return tx;
  }
  async exec(tx: Transaction) {
    return await this.rpc.execTx(tx);
  }
  send(tx: Transaction, config: Partial<TransactionHandlerConfig>) {
    const handler = new TransactionHandler(tx, this.#config.host, config);
    return handler.send();
  }
  async sendAsync(tx: Transaction, config: Partial<TransactionHandlerConfig>) {
    const handler = new TransactionHandler(tx, this.#config.host, config);
    return await handler.sendAsync();
  }
}
