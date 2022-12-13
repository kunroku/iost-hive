/// <reference types="node" />
import { Account } from './account';
import { KeyPairPermission } from './data/params';
export declare class Wallet {
    constructor();
    sign(id: string, permission: KeyPairPermission, data: Buffer): void;
    addAccount(account: Account): void;
    updateAccount(account: Account): void;
    removeAccount(id: string): void;
    toString(password: string): void;
    static parse(data: string, password: string): Wallet;
}
