import { BlockHeader } from '../types';
import { RpcClient } from '../rpcclient';

describe('getBlockHeader', () => {
  it('returns a valid block header', async () => {
    // Mock data
    const mockHeader: BlockHeader = {
      hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
      confirmations: 10,
      height: 1000,
      version: 536870912,
      versionHex: '20000000',
      merkleroot: 'e3e652fefe2e9d0f8c51f0a84a29926d6a1f8e491f6b52e7b9d9b1f8dab0e67',
      time: 1231469665,
      mediantime: 1231469578,
      nonce: 2573394689,
      bits: '1d00ffff',
      difficulty: 1,
      chainwork: '0000000000000000000000000000000000000000000000000000040004000400',
      previousblockhash: '00000000b0cc4c91314413a18b31f2b451e8b1a0ae047f322fd2c15a91dcd6e1',
      nextblockhash: '00000000d06f2d16f05a8b9e99d9a6a771908b7ea75701062c77d5a5b7a5dc5f'
    };

    // Mock the client
    const client = new RpcClient('http://localhost:8332', 'myusername', 'mypassword');
    client.call = jest.fn().mockResolvedValue(mockHeader);

    // Call the function and expect the result
    const result = await client.getBlockHeader(mockHeader.hash);
    expect(result).toEqual(mockHeader);
  });

  it('throws an error if the call to the RPC server fails', async () => {
    // Mock the client
    const client = new RpcClient('http://localhost:8332', 'myusername', 'mypassword');
    client.call = jest.fn().mockRejectedValue(new Error('RPC error'));

    // Call the function and expect an error to be thrown
    await expect(client.getBlockHeader('00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09'))
      .rejects.toThrow('Error calling getblockheader: RPC error');
  });
});
