export type AmountLimit = {
    token: string;
    value: string;
};
export type KeyPairPermission = 'active' | 'owner';
export type TransactionArgumentType = number | string | boolean | {
    [key: string]: TransactionArgumentType | Array<TransactionArgumentType>;
};
