/// <reference types="node" />
import { Signature } from '../crypto/signature';
import { AmountLimit, KeyPairPermission, TransactionArgumentType } from '../data/params';
export type TransactionProps = {
    chainId?: number;
    gasLimit?: number;
    gasRatio?: number;
};
export declare class Transaction {
    #private;
    constructor(props: TransactionProps);
    addSigner(id: string, permission: KeyPairPermission): this;
    addApprove(token: string, amount?: string): this;
    getApproveList(): AmountLimit[];
    addAction(contract: string, abi: string, args: TransactionArgumentType[]): void;
    setTime(expiration: number, delay: number, serverTimeDiff: number): void;
    getBaseHash(): Buffer;
    getPublishHash(): Buffer;
    addSign(signature: Signature): void;
    addPublishSign(id: string, signature: Signature): void;
    bytes(n: number): Buffer;
    toJSON(): {
        amount_limit: AmountLimit[];
        chainId: number;
        gasLimit: number;
        gasRatio: number;
        actions: {
            contract: string;
            actionName: string;
            data: string;
        }[];
        publisher: string;
        publisher_sigs: Signature[];
        signers: string[];
        signatures: Signature[];
        reserved: any;
        time: number;
        expiration: number;
        delay: number;
    };
    toString(): string;
}
