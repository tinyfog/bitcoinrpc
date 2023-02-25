import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const nodeEnv: string = (process.env.NODE_ENV as string);

interface RpcRequest {
  jsonrpc: string;
  id: string;
  method: string;
  params: any[];
}

interface RpcResponse {
  result: any;
  error: {
    code: number;
    message: string;
  } | null;
  id: string | null;
}

interface BlockchainInfo {
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

  interface Block {
    hash: string;
    confirmations: number;
    size: number;
    height: number;
    version: number;
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

  interface BlockCountResult {
    count: number;
  }

  interface BlockFilter {
    filter: string;
    header: string;
  }

  interface BlockHeader {
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

class RpcClient {
  private baseUrl: string;
  private authHeader: string;

  constructor(baseUrl: string, username: string, password: string) {
    this.baseUrl = baseUrl;
    this.authHeader = `Basic ${btoa(`${username}:${password}`)}`;
  }

  public async call(method: string, params: any[]): Promise<any> {
    const request: RpcRequest = {
      jsonrpc: "1.0",
      id: "curltest",
      method: method,
      params: params,
    };
    const config: AxiosRequestConfig = {
      headers: {
        "content-type": "text/plain",
        "Authorization": this.authHeader,
      },
    };
    const response: AxiosResponse = await axios.post(this.baseUrl, request, config);
    const data: RpcResponse = response.data;
    if (data.error !== null) {
      throw new Error(`RPC error: ${data.error.message}`);
    }
    return data.result;
  }

  public async getBestBlockHash(): Promise<string> {
    try {
      return await this.call("getbestblockhash", []);
    } catch (error) {
      throw new Error(`Error calling getbestblockhash: ${error.message}`);
    }
  }

  public async getBlock(blockhash: string): Promise<Block> {
    try {
      const result = await this.call("getblock", [blockhash]);
      return {
        hash: result.hash,
        confirmations: result.confirmations,
        size: result.size,
        height: result.height,
        version: result.version,
        merkleroot: result.merkleroot,
        tx: result.tx,
        time: result.time,
        mediantime: result.mediantime,
        nonce: result.nonce,
        bits: result.bits,
        difficulty: result.difficulty,
        chainwork: result.chainwork,
        previousblockhash: result.previousblockhash,
        nextblockhash: result.nextblockhash
      };
    } catch (error) {
      throw new Error(`Error calling getblock: ${error.message}`);
    }
  }
  
  public async getBlockchainInfo(): Promise<BlockchainInfo> {
    try {
      const result = await this.call("getblockchaininfo", []);
      return {
        chain: result.chain,
        blocks: result.blocks,
        headers: result.headers,
        bestblockhash: result.bestblockhash,
        difficulty: result.difficulty,
        mediantime: result.mediantime,
        verificationprogress: result.verificationprogress,
        chainwork: result.chainwork,
        pruned: result.pruned,
        softforks: result.softforks,
        bip9_softforks: result.bip9_softforks,
        warnings: result.warnings
      };
    } catch (error) {
      throw new Error(`Error calling getblockchaininfo: ${error.message}`);
    }
  }
  
  public async getBlockCount(): Promise<BlockCountResult> {
    try {
      const result = await this.call("getblockcount", []);
      return result;
    } catch (error) {
      throw new Error(`Error calling getblockcount: ${error.message}`);
    }
  }

  public async getBlockFilter(blockHash: string, filterType = "basic"): Promise<BlockFilter> {
    try {
      const result = await this.call("getblockfilter", [blockHash, filterType]);
      return {
        filter: result.filter,
        header: result.header,
      };
    } catch (error) {
      throw new Error(`Error calling getblockfilter: ${error.message}`);
    }
  }

  public async getBlockHash(blockHeight: number): Promise<string> {
    try {
      const result = await this.call("getblockhash", [blockHeight]);
      return result;
    } catch (error) {
      throw new Error(`Error calling getblockhash: ${error.message}`);
    }
  }
  
  public async getBlockHeader(blockHash: string): Promise<BlockHeader> {
    try {
      const result = await this.call("getblockheader", [blockHash]);
      return {
        hash: result.hash,
        confirmations: result.confirmations,
        height: result.height,
        version: result.version,
        versionHex: result.versionHex,
        merkleroot: result.merkleroot,
        time: result.time,
        mediantime: result.mediantime,
        nonce: result.nonce,
        bits: result.bits,
        difficulty: result.difficulty,
        chainwork: result.chainwork,
        previousblockhash: result.previousblockhash,
        nextblockhash: result.nextblockhash
      };
    } catch (error) {
      throw new Error(`Error calling getblockheader: ${error.message}`);
    }
  }
  
}


const rpcUrl = process.env.BITCOINRPCURL || "http://127.0.0.1:8332";
const rpcUsername = process.env.BITCOINRPCUSER || "Satoshi";
const rpcPassword = process.env.BITCOINRPCPASSWD || "Nakamoto";

const client = new RpcClient(rpcUrl, rpcUsername, rpcPassword);

client.getBestBlockHash()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });


client.getBlock("0000000000000000000207d22adf58cb0397063e35a9c13672cd4d0c53a2ba7d")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  client.getBlockchainInfo()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  client.getBlockCount()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  client.getBlockHash(1000)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  client.getBlockHeader("00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  console.log("Tests passed.")


