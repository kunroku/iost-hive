/// <reference types="node" />
import { Buffer } from 'buffer';
import { Account } from './account';
import { KeyPairPermission, NetworkConfig } from './data/params';
import { Signature } from './crypto';
export declare abstract class AbstractWallet {
    abstract accounts: string[];
    abstract sign(id: string, permission: KeyPairPermission, data: Buffer): Promise<Signature[]>;
}
export declare class Wallet extends AbstractWallet {
    #private;
    get accounts(): string[];
    constructor(accounts: Account[]);
    sign(name: string, permission: KeyPairPermission, data: Buffer): Promise<Signature[]>;
    authorize(name: string, network: NetworkConfig): Promise<{
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
    add(account: Account): void;
    update(account: Account): void;
    remove(name: string): void;
    verify(id: string, permission: KeyPairPermission, data: Buffer, signature: Buffer): boolean;
    toString(password?: string): string;
    static parse(data: string, password?: string): Wallet;
}
