import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RpcRequest, RpcResponse, BlockchainInfo, Block, BlockCountResult, BlockFilter, BlockHeader  } from "./types"

const nodeEnv: string = (process.env.NODE_ENV as string);

export class RpcClient {
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
        strippedsize: result.strippedsize,
        height: result.height,
        weight: result.weight,
        version: result.version,
        versionHex: result.versionHex,
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
        time: result.time,
        mediantime: result.mediantime,
        verificationprogress: result.verificationprogress,
        initialblockdownload: result.initialblockdownload,
        chainwork: result.chainwork,
        sizeondisk: result.sizeondisk,
        pruneheight: result.pruneheight,
        automaticpruning: result.automaticpruning,
        prunetargetsize: result.prunetargetsize,
        pruned: result.pruned,
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
