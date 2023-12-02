import { RPC, HTTPProvider } from './api';
import { NetworkConfig, KeyPairPermission } from './data/params';
import { Transaction, TransactionProps } from './transaction/transaction';
import {
  TransactionHandler,
  TransactionHandlerConfig,
} from './transaction/transaction-handler';
import { AbstractWallet } from './wallet';

export class IOST {
  readonly #config: NetworkConfig;
  #serverTimeDiff = 0;
  get config(): NetworkConfig {
    return { ...this.#config };
  }
  get serverTimeDiff() {
    return this.#serverTimeDiff;
  }
  get rpc() {
    return new RPC(new HTTPProvider(this.config.host));
  }
  constructor(config: NetworkConfig) {
    this.#config = { ...config };
  }
  async setServerTimeDiff() {
    const requestStartTime = new Date().getTime() * 1e6;
    const nodeInfo = await this.rpc.getNodeInfo();
    const serverTime = Number(nodeInfo.server_time);
    const serverTimeDiff = serverTime - requestStartTime;
    const timeBuffer = 1 * 1e9;
    this.#serverTimeDiff = serverTimeDiff + timeBuffer;
    return this.serverTimeDiff;
  }
  async sign(
    wallet: AbstractWallet,
    tx: Transaction,
    publisher: string,
    signers: { id: string; permission: KeyPairPermission }[],
  ) {
    for (const signer of signers) {
      tx.addSigner(signer.id, signer.permission);
    }
    for (const signer of signers) {
      const signatures = await wallet.sign(
        signer.id,
        signer.permission,
        tx.getBaseHash(),
      );
      tx.addSign(signatures);
    }
    if (publisher) {
      const signatures = await wallet.sign(
        publisher,
        'active',
        tx.getPublishHash(),
      );
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
