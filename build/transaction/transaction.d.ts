/// <reference types="node" />
import { Signature, SignatureStruct } from '../crypto/signature';
import { AmountLimit, KeyPairPermission, TransactionArgumentType } from '../data/params';
export type TransactionProps = {
    chainId?: number;
    gasLimit?: number;
    gasRatio?: number;
};
export type TransactionStruct = {
    amount_limit: AmountLimit[];
    chain_id: number;
    gasLimit: number;
    gasRatio: number;
    actions: {
        contract: string;
        actionName: string;
        data: string;
    }[];
    publisher: string;
    publisher_sigs: SignatureStruct[];
    signers: string[];
    signatures: SignatureStruct[];
    reserved: null;
    time: number;
    expiration: number;
    delay: number;
};
export declare class Transaction {
    #private;
    get actions(): {
        contract: string;
        actionName: string;
        data: string;
    }[];
    constructor(props: TransactionProps);
    addApprove(token: string, amount?: string): void;
    getApproveList(): AmountLimit[];
    addAction(contract: string, abi: string, args: TransactionArgumentType[]): void;
    setTime(expiration: number, delay: number, serverTimeDiff: number): void;
    getBaseHash(): Buffer;
    getPublishHash(): Buffer;
    addSigner(id: string, permission: KeyPairPermission): void;
    addSign(signatures: Signature[]): void;
    setPublisher(id: string): void;
    addPublishSign(signatures: Signature[]): void;
    bytes(n: number): Buffer;
    toJSON(): TransactionStruct;
    toString(): string;
}
