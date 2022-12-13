import { KeyPairPermission, AmountLimit } from './params';
export type TxInfo = {
    status: string;
    transaction: {
        hash: string;
        time: string;
        expiration: string;
        gas_ratio: number;
        gas_limit: number;
        delay: string;
        chain_id: number;
        actions: {
            contract: string;
            action_name: string;
            data: string;
        }[];
        signers: [];
        publisher: string;
        referred_tx: string;
        amount_limit: AmountLimit[];
        tx_receipt: TxReceiptInfo;
    };
    block_number: string;
};
export type TxReceiptInfo = {
    tx_hash: string;
    gas_usage: number;
    ram_usage: {
        [id: string]: string;
    };
    status_code: string;
    message: string;
    returns: string[];
    receipts: {
        func_name: string;
        content: string;
    }[];
};
export type NodeInfo = {
    build_time: string;
    git_hash: string;
    mode: string;
    network: {
        id: string;
        peer_count: number;
        peer_count_inbound: number;
        peer_count_outbound: number;
    };
    code_version: string;
    server_time: string;
};
export type BlockInfo = {
    status: string;
    block: {
        hash: string;
        version: string;
        parent_hash: string;
        tx_merkle_hash: string;
        tx_receipt_merkle_hash: string;
        number: string;
        witness: string;
        time: string;
        gas_usage: number;
        tx_count: string;
        info: {
            mode: number;
            thread: number;
            batch_index: string[];
        } | null;
        orig_info: string;
        transactions: TxInfo['transaction'][];
    };
};
export type ChainInfo = {
    net_name: string;
    protocol_version: string;
    chain_id: number;
    head_block: string;
    head_block_hash: string;
    lib_block: string;
    lib_block_hash: string;
    witness_list: string[];
    lib_witness_list: string[];
    pending_witness_list: string[];
    head_block_time: string;
    lib_block_time: string;
};
export type TokenInfo = {
    symbol: string;
    full_name: string;
    issuer: string;
    total_supply: string;
    current_supply: string;
    decimal: number;
    can_transfer: boolean;
    only_issuer_can_transfer: boolean;
    total_supply_float: number;
    current_supply_float: number;
};
export type RAMInfo = {
    used_ram: string;
    available_ram: string;
    total_ram: string;
    sell_price: number;
    buy_price: number;
};
export type AccountInfo = {
    name: string;
    balance: number;
    gas_info: {
        current_total: number;
        transferable_gas: number;
        pledge_gas: number;
        increase_speed: number;
        limit: number;
        pledged_info: {
            pledger: string;
            amount: number;
        }[];
    };
    ram_info: {
        available: string;
        used: string;
        total: string;
    };
    permissions: {
        active: {
            name: string;
            group_names: any[];
            items: {
                id: string;
                is_key_pair: boolean;
                weight: string;
                permission: KeyPairPermission;
            }[];
            threshold: string;
        };
        owner: {
            name: string;
            group_names: any[];
            items: {
                id: string;
                is_key_pair: boolean;
                weight: string;
                permission: KeyPairPermission;
            }[];
            threshold: string;
        };
    };
    groups: {
        [key: string]: {
            name: string;
            items: {
                id: string;
                is_key_pair: boolean;
                weight: number;
            }[];
        };
    };
    frozen_balances: {
        amount: number;
        time: string;
    }[];
    vote_infos: [];
};
export type ProducerVoteInfo = {
    pubkey: string;
    loc: string;
    url: string;
    net_id: string;
    is_producer: boolean;
    status: string;
    online: boolean;
    votes: number;
};
