import { Block } from '../types';
import { RpcClient } from '../rpcclient';

describe('getBlock', () => {
  const rpcClient = new RpcClient('myusername', 'mypassword', 'http://127.0.0.1:8332');

  const mockBlock: Block = {
    hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
    confirmations: 677080,
    size: 215,
    strippedsize: 215,
    weight: 860,
    height: 1000,
    version: 1,
    versionHex: '00000001',
    merkleroot: '8b837eea6ad78141d957c9d24bb4f0da3cc05f0a13e2a68a7243e3c68f19eef9',
    tx: ['b8c4040d54b845f41b3272217e391a74ecf7c94705a9d33a928bf52855619b2e'],
    time: 1232346886,
    mediantime: 1232344830,
    nonce: 2595206198,
    bits: '1d00ffff',
    difficulty: 1,
    chainwork: '000000000000000000000000000000000000000000000000000003e903a7a321',
    nTx: 1,
    previousblockhash: '0000000013459c2244b4c4bda5d6945082f488c7f0f8a79a54fa393f80ee9a5a',
    nextblockhash: '00000000c41c1d0a28c9f3ee5dd5dfb156882d5ec1e5e5c431ecaa1e988a5478',
  };

  test('should return block with specified hash', async () => {
    rpcClient.call = jest.fn().mockResolvedValueOnce(mockBlock);

    const result = await rpcClient.getBlock('00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09');

    expect(rpcClient.call).toHaveBeenCalledWith('getblock', ['00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09']);
    expect(result).toEqual(mockBlock);
  });

  test('should throw an error when RPC call fails', async () => {
    const error = new Error('RPC call failed');
    rpcClient.call = jest.fn().mockRejectedValueOnce(error);

    await expect(rpcClient.getBlock('00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09')).rejects.toThrowError(`Error calling getblock: ${error.message}`);
  });
});
