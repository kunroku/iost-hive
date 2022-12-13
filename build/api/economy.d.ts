import { AbstractRPC } from './abstract-rpc';
export type GasRation = {
    lowest_gas_ratio: number;
    median_gas_ratio: number;
};
export type RAMInfo = {
    used_ram: string;
    available_ram: string;
    total_ram: string;
    sell_price: number;
    buy_price: number;
};
export declare class EconomyRPC extends AbstractRPC {
    getGasRatio(): Promise<GasRation>;
    getRAMInfo(): Promise<RAMInfo>;
}
