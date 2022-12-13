import { AbstractRPC } from './abstract-rpc';
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
export declare class NetRPC extends AbstractRPC {
    getNodeInfo(): Promise<NodeInfo>;
}
