export interface RpcRequest {
    jsonrpc: string;
    id: string;
    method: string;
    params: any[];
}

export interface RpcResponse {
    result: any;
    error: {
        code: number;
        message: string;
    };
    id: string;
}

export interface BlockchainInfo {
    chain: string;
    blocks: number;
    headers: number;
    bestblockhash: string;
    difficulty: number;
    mediantime: number;
    verificationprogress: number;
    chainwork: string;
    pruned: boolean;
    softforks: {
        id: string;
        version: number;
        reject: {
            status: boolean;
        }
    }[];
    bip9_softforks: {
        name: string;
        status: string;
        bit: number;
        startTime: number;
        timeout: number;
        since: number;
    }[];
    warnings: string;
}

export interface Block {
    hash: string;
    confirmations: number;
    size: number;
    strippedsize: number;
    height: number;
    weight: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    tx: string[];
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainwork: string;
    previousblockhash: string;
    nextblockhash: string;
}

export interface BlockCountResult {
    count: number;
}

export interface BlockFilter {
    filter: string;
    header: string;
}

export interface BlockHeader {
    hash: string;
    confirmations: number;
    height: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainwork: string;
    previousblockhash: string;
    nextblockhash?: string;
}
