/// <reference types="node" />
import { AbstractKeyPair, KeyPairJSON } from './kp';
import { KeyPairPermission } from './data/params';
import { Signature } from './crypto';
export type AccountJSON = {
    id: string;
    auth: {
        active: KeyPairJSON[];
        owner: KeyPairJSON[];
    };
};
export declare class Account {
    readonly id: string;
    readonly auth: {
        active: AbstractKeyPair[];
        owner: AbstractKeyPair[];
    };
    constructor(id: string);
    addKeyPair(permission: KeyPairPermission, keyPair: AbstractKeyPair): this;
    sign(data: Buffer, permission: KeyPairPermission): Signature[];
    toJSON(): AccountJSON;
    toString(): string;
    static parse(data: string): Account;
}
