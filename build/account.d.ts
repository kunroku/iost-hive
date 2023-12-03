/// <reference types="node" />
import { Buffer } from 'buffer';
import { AbstractKeyPair, KeyPairJSON } from './kp';
import { NetworkConfig, KeyPairPermission } from './data/params';
export type AccountJSON = {
    name: string;
    auth: {
        active: KeyPairJSON[];
        owner: KeyPairJSON[];
    };
};
export declare class Account implements AccountJSON {
    name: string;
    auth: {
        active: AbstractKeyPair[];
        owner: AbstractKeyPair[];
    };
    constructor(name: string);
    addKeyPair(permission: KeyPairPermission, keyPair: AbstractKeyPair): this;
    sign(permission: KeyPairPermission, data: Buffer): import("./crypto").Signature[];
    verify(permission: KeyPairPermission, data: Buffer, signature: Buffer): boolean;
    toJSON(): AccountJSON;
    toString(): string;
    authorize(network: NetworkConfig): Promise<{
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
    static parse(data: string): Account;
}
