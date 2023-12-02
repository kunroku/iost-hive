import { ContractABI } from '../utils/contract-abi';
import { ContractInterface } from './contract-interface';

export class SystemContract extends ContractInterface {
  get id() {
    return 'system.iost';
  }
  setCode(source: string, abi: ContractABI) {
    const data = { code: source, info: abi };
    this._call('setCode', [JSON.stringify(data)]);
  }
  updateCode(
    source: string,
    abi: ContractABI,
    contractId: string,
    data: string,
  ) {
    this._call('updateCode', [
      JSON.stringify({ ID: contractId, code: source, info: abi }),
      data,
    ]);
  }
  cancelDelaytx(hash: string) {
    this._call('cancelDelaytx', [hash]);
  }
  receipt(data: string) {
    this._call('receipt', [data]);
  }
}
