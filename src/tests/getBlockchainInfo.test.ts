import { BlockchainInfo } from '../types';
import { RpcClient } from '../rpcclient';

describe("getBlockchainInfo", () => {
  const mockBlockchainInfo: BlockchainInfo = {
    "chain": "main",
    "blocks": 779797,
    "headers": 779797,
    "bestblockhash": "00000000000000000005413c4460c45f80372bff37388c1719986fbe70dd0a0a",
    "difficulty": 43053844193928.45,
    "time": 1678226788,
    "mediantime": 1678224664,
    "verificationprogress": 0.9999953515440624,
    "initialblockdownload": false,
    "chainwork": "0000000000000000000000000000000000000000420676cb44ebb7beebed0d68",
    "sizeondisk": 524877676945,
    "pruneheight" : 1,
    "automaticpruning": false,
    "prunetargetsize": 2,
    "pruned": false,
    "warnings": ""
  }

  it("should return the blockchain info", async () => {
    const rpcClient = new RpcClient('myusername', 'mypassword', 'http://127.0.0.1:8332');
    const mockCall = jest.fn().mockResolvedValue(mockBlockchainInfo);
    rpcClient.call = mockCall;
    const result = await rpcClient.getBlockchainInfo();
    expect(result).toEqual(mockBlockchainInfo);
    expect(mockCall).toHaveBeenCalledWith("getblockchaininfo", []);
  });

  it("should throw an error if the RPC call fails", async () => {
    const rpcClient = new RpcClient('myusername', 'mypassword', 'http://127.0.0.1:8332');
    const mockError = new Error('Failed to get getBlockChainInfo');
    const mockCall = jest.fn().mockRejectedValue(mockError);
    rpcClient.call = mockCall;
    await expect(rpcClient.getBlockchainInfo())
      .rejects.toThrow(`Error calling getblockchaininfo: ${mockError.message}`);
  });
});
