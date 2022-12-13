import { OfficialContract } from './official-contract';
export declare class GASContract extends OfficialContract {
    readonly id = "gas.iost";
    pledge(pledgor: string, to: string, amount: string): void;
    unpledge(pledgor: string, from: string, amount: string): void;
}
