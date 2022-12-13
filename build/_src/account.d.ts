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
    #private;
    get id(): string;
    constructor(_id: string);
    addKeyPair(permission: KeyPairPermission, keyPair: AbstractKeyPair): this;
    sign(data: Buffer, permission: KeyPairPermission): Signature[];
    get json(): AccountJSON;
    toString(): string;
    static parse(data: string): Account;
}
