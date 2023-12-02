import { NetworkConfig } from '../data/params';
import { IOST } from '../iost';

export class NetworkManager {
  #networks: NetworkConfig[];
  #network: number;
  get network() {
    return this.#network;
  }
  set network(network: number) {
    this.#network = network;
  }
  get networks(): NetworkConfig[] {
    return JSON.parse(JSON.stringify(this.networks));
  }
  get iost() {
    return new IOST(this.#networks[this.network]);
  }
  constructor(networks: NetworkConfig[], network: number) {
    this.#networks = JSON.parse(JSON.stringify(networks));
    this.#network = network;
  }
  update(network: number, config: NetworkConfig) {
    this.#networks[network] = config;
  }
  add(config: NetworkConfig) {
    this.#networks.push(config);
  }
  remove(network: number) {
    if (this.#networks[network]) {
      this.#network = 0;
      this.#networks.splice(network, 1);
      // if (this.network === network && network !== 0) {
      //   this.#network = network - 1;
      // } else if (network < this.network) {
      //   this.#network = network - 1;
      // }
    }
  }
}
