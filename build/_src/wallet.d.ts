/// <reference types="node" />
import { Account } from './account';
import { KeyPairPermission } from './data/params';
import { Signature } from './crypto';
export declare class Wallet {
    #private;
    sign(id: string, permission: KeyPairPermission, data: Buffer): Signature[];
    addAccount(account: Account): void;
    updateAccount(account: Account): void;
    removeAccount(id: string): void;
    toString(password: string): string;
    static parse(data: string, password: string): Wallet;
}
