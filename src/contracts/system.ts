import { ContractABI } from '../utils/contract-abi';
import { ContractInterface } from './contract-interface';

export class SystemContract extends ContractInterface {
  get id() {
    return 'system.iost';
  }
  setCode(source: string, abi: ContractABI) {
    const data = { code: source, info: abi };
    this.call('setCode', [JSON.stringify(data)]);
  }
  updateCode(
    source: string,
    abi: ContractABI,
    contractId: string,
    data: string,
  ) {
    this.call('updateCode', [
      JSON.stringify({ ID: contractId, code: source, info: abi }),
      data,
    ]);
  }
  cancelDelaytx(hash: string) {
    this.call('cancelDelaytx', [hash]);
  }
  receipt(data: string) {
    this.call('receipt', [data]);
  }
}
