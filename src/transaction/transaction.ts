import { sha3 } from '../utils/sha3';
import { Codec } from '../crypto/codec';
import { Signature, SignatureStruct } from '../crypto/signature';
import {
  AmountLimit,
  KeyPairPermission,
  TransactionArgumentType,
} from '../data/params';

export type TransactionProps = {
  chainId?: number;
  gasLimit?: number;
  gasRatio?: number;
};

const defaultTransactionConfig: Required<TransactionProps> = {
  chainId: 1024,
  gasLimit: 100000,
  gasRatio: 1,
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

export class Transaction {
  readonly #amount_limit: AmountLimit[] = [];
  readonly #chainId: number;
  readonly #gasLimit: number;
  readonly #gasRatio: number;
  readonly #actions: {
    contract: string;
    actionName: string;
    data: string;
  }[] = [];
  get actions() {
    return JSON.parse(JSON.stringify(this.#actions)) as {
      contract: string;
      actionName: string;
      data: string;
    }[];
  }
  #publisher = '';
  #publisher_sigs: Signature[] = [];
  #signers: string[] = [];
  #signatures: Signature[] = [];
  #reserved = null;
  #time = new Date().getTime() * 1e6;
  #expiration = new Date().getTime() * 1e6;
  #delay = 0;
  constructor(props: TransactionProps) {
    const config: Required<TransactionProps> = {
      ...defaultTransactionConfig,
      ...props,
    };
    this.#chainId = config.chainId;
    this.#gasLimit = config.gasLimit;
    this.#gasRatio = config.gasRatio;
  }
  addApprove(token: string, amount = 'unlimited') {
    const index = this.#amount_limit.findIndex((e) => e.token === token);
    if (index === -1) {
      const amountLimit: AmountLimit = { token, value: amount };
      this.#amount_limit.push(amountLimit);
    } else {
      const amountLimit = this.#amount_limit[index];
      if (amount === 'unlimited' || amountLimit.value === 'unlimited') {
        amountLimit.value = 'unlimited';
      } else {
        amountLimit.value = (
          Number(amountLimit.value) + Number(amount)
        ).toFixed(8);
      }
    }
  }
  getApproveList() {
    return this.#amount_limit;
  }
  addAction(contract: string, abi: string, args: TransactionArgumentType[]) {
    this.#actions.push({
      contract: contract,
      actionName: abi,
      data: JSON.stringify(args),
    });
  }
  setTime(expiration: number, delay: number, serverTimeDiff: number) {
    this.#time = new Date().getTime() * 1e6 + serverTimeDiff;
    this.#expiration = this.#time + expiration * 1e9;
    this.#delay = delay;
  }
  getBaseHash() {
    return sha3(256, this.bytes(0));
  }
  getPublishHash() {
    return sha3(256, this.bytes(1));
  }
  addSigner(id: string, permission: KeyPairPermission) {
    if (!this.#signers.includes(`${id}@${permission}`)) {
      this.#signers.push(`${id}@${permission}`);
    }
  }
  addSign(signatures: Signature[]) {
    this.#signatures.push(...signatures);
  }
  setPublisher(id: string) {
    this.#publisher = id;
  }
  addPublishSign(signatures: Signature[]) {
    this.#publisher_sigs.push(...signatures);
  }
  bytes(n: number) {
    const c = new Codec();
    c.pushInt64(this.#time);
    c.pushInt64(this.#expiration);
    c.pushInt64(this.#gasRatio * 100);
    c.pushInt64(this.#gasLimit * 100);
    c.pushInt64(this.#delay);
    c.pushInt(this.#chainId);
    if (!this.#reserved) {
      c.pushInt(0);
    }

    c.pushInt(this.#signers.length);
    for (let i = 0; i < this.#signers.length; i++) {
      c.pushString(this.#signers[i]);
    }
    c.pushInt(this.#actions.length);
    for (let i = 0; i < this.#actions.length; i++) {
      const c2 = new Codec();
      c2.pushString(this.#actions[i].contract);
      c2.pushString(this.#actions[i].actionName);
      c2.pushString(this.#actions[i].data);
      c.pushBytes(c2.toBuffer());
    }
    c.pushInt(this.#amount_limit.length);
    for (let i = 0; i < this.#amount_limit.length; i++) {
      const c2 = new Codec();
      c2.pushString(this.#amount_limit[i].token);
      c2.pushString(this.#amount_limit[i].value + '');
      c.pushBytes(c2.toBuffer());
    }
    if (n > 0) {
      c.pushInt(this.#signatures.length);
      for (let i = 0; i < this.#signatures.length; i++) {
        c.pushBytes(this.#signatures[i].toBuffer());
      }
    }
    return c.toBuffer();
  }
  toJSON(): TransactionStruct {
    return {
      amount_limit: this.#amount_limit.map((e) => ({ ...e })),
      chain_id: this.#chainId,
      gasLimit: this.#gasLimit,
      gasRatio: this.#gasRatio,
      actions: this.#actions.map((e) => ({ ...e })),
      publisher: this.#publisher,
      publisher_sigs: this.#publisher_sigs.map((e) => e.toJSON()),
      signers: [...this.#signers],
      signatures: this.#signatures.map((e) => e.toJSON()),
      reserved: this.#reserved,
      time: this.#time,
      expiration: this.#expiration,
      delay: this.#delay,
    };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
}
