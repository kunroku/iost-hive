/// <reference types="node" />
import { AbstractKeyPair, KeyPairJSON } from './kp';
import { KeyPairPermission } from './data/params';
export type AccountJSON = {
    id: string;
    auth: {
        active: KeyPairJSON[];
        owner: KeyPairJSON[];
    };
};
export declare class Account {
    #private;
    get id(): string;
    constructor(id: string);
    addKeyPair(permission: KeyPairPermission, keyPair: AbstractKeyPair): this;
    sign(permission: KeyPairPermission, data: Buffer): import("./crypto").Signature[];
    verify(permission: KeyPairPermission, data: Buffer, signature: Buffer): boolean;
    toJSON(): AccountJSON;
    toString(): string;
    static parse(data: string): Account;
}
