import { KeyPairPermission } from '../data/params';
import { ContractInterface } from './contract-interface';

export class AuthContract extends ContractInterface {
  get id() {
    return 'auth.iost';
  }
  addPermission(id: string, permision: KeyPairPermission, threshold: number) {
    this._call('addPermission', [id, permision, threshold]);
  }
  dropPermission(id: string, permision: KeyPairPermission) {
    this._call('dropPermission', [id, permision]);
  }
  assignPermission(
    id: string,
    permision: KeyPairPermission,
    publicKey: string,
    weight: number,
  ) {
    this._call('assignPermission', [id, permision, publicKey, weight]);
  }
  revokePermission(
    id: string,
    permision: KeyPairPermission,
    publicKey: string,
  ) {
    this._call('revokePermission', [id, permision, publicKey]);
  }
  signUp(id: string, ownerkey: string, activekey: string) {
    this._call('signUp', [id, ownerkey, activekey]);
  }
}
