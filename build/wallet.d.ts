/// <reference types="node" />
import { Account } from './account';
import { KeyPairPermission } from './data/params';
export interface WalletRequestHandlerInterface {
    requireSign: (id: string, permission: KeyPairPermission, data: Buffer) => Promise<boolean>;
    requireAddAccount: (account: Account) => Promise<boolean>;
    requireUpdateAccount: (account: Account) => Promise<boolean>;
    requireRemoveAccount: (id: string) => Promise<boolean>;
    requireUpdatePassword: (password: string) => Promise<boolean>;
}
export declare class WalletRequestHandler implements WalletRequestHandlerInterface {
    readonly requireSign: (id: string, permission: KeyPairPermission, data: Buffer) => Promise<boolean>;
    readonly requireAddAccount: (account: Account) => Promise<boolean>;
    readonly requireUpdateAccount: (account: Account) => Promise<boolean>;
    readonly requireRemoveAccount: (id: string) => Promise<boolean>;
    readonly requireUpdatePassword: (password: string) => Promise<boolean>;
    constructor(requireSign: (id: string, permission: KeyPairPermission, data: Buffer) => Promise<boolean>, requireAddAccount: (account: Account) => Promise<boolean>, requireUpdateAccount: (account: Account) => Promise<boolean>, requireRemoveAccount: (id: string) => Promise<boolean>, requireUpdatePassword: (password: string) => Promise<boolean>);
}
export declare class Wallet {
    #private;
    get accounts(): string[];
    constructor(accounts: Account[], password: string, walletRequestHandler: WalletRequestHandlerInterface);
    sign(id: string, permission: KeyPairPermission, data: Buffer): Promise<import("./crypto").Signature[]>;
    addAccount(account: Account): Promise<void>;
    updateAccount(account: Account): Promise<void>;
    removeAccount(id: string): Promise<void>;
    updatePassword(password: string): Promise<void>;
    verify(id: string, permission: KeyPairPermission, data: Buffer, signature: Buffer): boolean;
    toString(): string;
    static connect(): Wallet;
    static parse(data: string, password: string, auth: WalletRequestHandlerInterface): Wallet;
}
