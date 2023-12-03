/// <reference types="node" />
import { Buffer } from 'buffer';
import { Account } from '../account';
import { Signature } from '../crypto';
import { KeyPairPermission, NetworkConfig } from '../data/params';
import { IOST } from '../iost';
import { AbstractWallet } from '../wallet';
export type SignRequestCallback = (name: string, permission: KeyPairPermission, data: Buffer) => Promise<boolean>;
export type ConnectRequestCallback = () => Promise<boolean>;
export declare class Hive extends AbstractWallet {
    #private;
    get account(): string;
    set account(name: string);
    get accounts(): string[];
    get network(): number;
    set network(network: number);
    get networks(): NetworkConfig[];
    get iost(): IOST;
    constructor(accounts: Account[], account: string, networks: NetworkConfig[], network: number, signRequestCallback: SignRequestCallback, connectRequestCallback: ConnectRequestCallback);
    sign(name: string, permission: KeyPairPermission, data: Buffer): Promise<Signature[]>;
    authorize(name: string): Promise<{
        active: {
            weight: number;
            threshold: number;
            available: boolean;
        };
        owner: {
            weight: number;
            threshold: number;
            available: boolean;
        };
    }>;
    connect(): Promise<Hive>;
}
