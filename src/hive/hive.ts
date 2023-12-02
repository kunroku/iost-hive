import { Account } from '../account';
import { Signature } from '../crypto';
import { KeyPairPermission, NetworkConfig } from '../data/params';
import { IOST } from '../iost';
import { AbstractWallet, Wallet } from '../wallet';
import { NetworkManager } from './network-manager';

export type SignRequestCallback = (
  name: string,
  permission: KeyPairPermission,
  data: Buffer,
) => Promise<boolean>;
export type ConnectRequestCallback = () => Promise<boolean>;

/**
 * chrome extension bridge
 */
export class Hive extends AbstractWallet {
  #network: NetworkManager;
  #wallet: Wallet;
  #account: string;
  #signRequestCallback: SignRequestCallback;
  #connectRequestCallback: ConnectRequestCallback;
  get account() {
    return this.#account;
  }
  set account(name: string) {
    this.#account = name;
  }
  get accounts() {
    return this.#wallet.accounts;
  }
  get network() {
    return this.#network.network;
  }
  set network(network: number) {
    this.#network.network = network;
  }
  get networks(): NetworkConfig[] {
    return JSON.parse(JSON.stringify(this.#network.networks));
  }
  get iost() {
    return new IOST(this.networks[this.network]);
  }
  constructor(
    accounts: Account[],
    account: string,
    networks: NetworkConfig[],
    network: number,
    signRequestCallback: SignRequestCallback,
    connectRequestCallback: ConnectRequestCallback,
  ) {
    super();
    this.#wallet = new Wallet(accounts);
    this.#account = account;
    this.#network = new NetworkManager(networks, network);
    this.#signRequestCallback = signRequestCallback;
    this.#connectRequestCallback = connectRequestCallback;
  }
  async sign(
    name: string,
    permission: KeyPairPermission,
    data: Buffer,
  ): Promise<Signature[]> {
    const bool = await this.#signRequestCallback(name, permission, data);
    if (!bool) {
      throw new Error('sign request denied');
    }
    return this.#wallet.sign(name, permission, data);
  }
  async authorize(name: string) {
    return await this.#wallet.authorize(name, this.networks[this.network]);
  }
  async connect() {
    const extension = window && (window['hive'] as Hive | undefined);
    if (!extension) {
      throw new Error('hive not installed');
    }
    const bool = await this.#connectRequestCallback();
    if (!bool) {
      throw new Error('conenct request denied');
    }
    return extension;
  }
}
