import { AbstractKeyPair } from '../kp/kp';
import { Signature } from '../crypto/signature';
import { AmountLimit, KeyPairPermission, TransactionArgumentType } from '../data/params';
import { ContractTransactions } from './contracts';
export type TransactionProps = {
    chainId?: number;
    gasLimit?: number;
    gasRatio?: number;
};
export declare class Transaction {
    readonly amount_limit: AmountLimit[];
    readonly chainId: number;
    readonly gasLimit: number;
    readonly gasRatio: number;
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
    readonly contracts: ContractTransactions;
    constructor(props: TransactionProps);
    addSigner(id: string, permission: KeyPairPermission): this;
    addApprove(token: string, amount?: number | 'unlimited'): this;
    getApproveList(): AmountLimit[];
    addAction(contract: string, abi: string, args: TransactionArgumentType[]): this;
    setTime(expiration: number, delay: number, serverTimeDiff: number): this;
    private _base_hash;
    addSign(keyPair: AbstractKeyPair): this;
    private _publish_hash;
    addPublishSign(id: string, keyPair: AbstractKeyPair): this;
    private _bytes;
    toString(): string;
}
