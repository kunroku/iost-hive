import { NetworkConfig } from '../data/params';
import { IOST } from '../iost';
export declare class NetworkManager {
    #private;
    get network(): number;
    set network(network: number);
    get networks(): NetworkConfig[];
    get iost(): IOST;
    constructor(networks: NetworkConfig[], network: number);
    update(network: number, config: NetworkConfig): void;
    add(config: NetworkConfig): void;
    remove(network: number): void;
}
