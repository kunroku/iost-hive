import { KeyPairPermission } from '../../data/params';
import { AbstractContractTransaction } from './contract';
export declare class AuthContractTransaction extends AbstractContractTransaction {
    readonly id = "auth.iost";
    assignPermission(id: string, permision: KeyPairPermission, publicKey: string, weight: number): void;
    revokePermission(id: string, permision: KeyPairPermission, publicKey: string): void;
    signUp(id: string, ownerkey: string, activekey: string): void;
}
