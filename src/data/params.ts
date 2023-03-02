export type AmountLimit = {
  token: string;
  value: string;
};
export type KeyPairPermission = 'active' | 'owner';
export type TransactionArgumentType =
  | number
  | string
  | boolean
  | { [key: string]: TransactionArgumentType | Array<TransactionArgumentType> };
export type IOSTConfig = {
  host: string;
  chainId: number;
};
export type SubscribeEventType = 'CONTRACT_EVENT' | 'CONTRACT_RECEIPT';
export type Subscribe = {
  result: {
    event: {
      topic: SubscribeEventType;
      data: string;
      time: string;
    };
  };
};
export type SubscribeEvent = {
  messages: (messages: Subscribe[]) => void;
};
export type Network = 'MAINNET' | 'TESTNET' | 'LOCALNET';
