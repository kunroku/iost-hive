import { KeyPairPermission } from '../data/params';
import { OfficialContract } from './official-contract';
export declare class AuthContract extends OfficialContract {
    get id(): string;
    addPermission(id: string, permision: KeyPairPermission, threshold: number): void;
    dropPermission(id: string, permision: KeyPairPermission): void;
    assignPermission(id: string, permision: KeyPairPermission, publicKey: string, weight: number): void;
    revokePermission(id: string, permision: KeyPairPermission, publicKey: string): void;
    signUp(id: string, ownerkey: string, activekey: string): void;
}
