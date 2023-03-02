/// <reference types="node" />
import { AbstractKeyPair, KeyPairJSON } from './kp';
import { KeyPairPermission } from './data/params';
import { AccountAdapter } from './iwallet/iwallet-adapter';
export type AccountJSON = {
    name: string;
    auth: {
        active: KeyPairJSON[];
        owner: KeyPairJSON[];
    };
};
export declare class Account extends AccountAdapter {
    #private;
    constructor(name: string);
    addKeyPair(permission: KeyPairPermission, keyPair: AbstractKeyPair): this;
    sign(permission: KeyPairPermission, data: Buffer): import("./crypto").Signature[];
    verify(permission: KeyPairPermission, data: Buffer, signature: Buffer): boolean;
    toJSON(): AccountJSON;
    toString(): string;
    static parse(data: string): Account;
}
