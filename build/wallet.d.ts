/// <reference types="node" />
import { Buffer } from 'buffer';
import { Account } from './account';
import { KeyPairPermission } from './data/params';
export declare class Wallet {
    #private;
    get accounts(): string[];
    constructor(accounts: Account[]);
    sign(id: string, permission: KeyPairPermission, data: Buffer): import("./crypto").Signature[];
    addAccount(account: Account): void;
    updateAccount(account: Account): void;
    removeAccount(id: string): void;
    verify(id: string, permission: KeyPairPermission, data: Buffer, signature: Buffer): boolean;
    toString(password?: string): string;
    static parse(data: string, password?: string): Wallet;
}
