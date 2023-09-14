import { ContractABI } from '../utils/contract-abi';
import { OfficialContract } from './official-contract';

export class SystemContract extends OfficialContract {
  get id() {
    return 'system.iost';
  }
  setCode(source: string, abi: ContractABI) {
    const data = { code: source, info: abi };
    this.call('setCode', [JSON.stringify(data)]);
  }
  updateCode(source: string, abi: ContractABI, contractId: string) {
    const data = { ID: contractId, code: source, info: abi };
    this.call('updateCode', [JSON.stringify(data)]);
  }
  cancelDelaytx(hash: string) {
    this.call('cancelDelaytx', [hash]);
  }
  receipt(data: string) {
    this.call('receipt', [data]);
  }
}
