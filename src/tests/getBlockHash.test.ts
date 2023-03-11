import { RpcClient } from '../rpcclient';

describe('getBlockHash', () => {
    it('returns the block hash for the given block height', async () => {
      // Mock data
      const mockHash = '000000000000000000015f3501a6306e8447146d5f6f5fa41457f6ab9edfcda5';
  
      // Mock the client
      const client = new RpcClient('http://localhost:8332', 'myusername', 'mypassword');
      client.call = jest.fn().mockResolvedValue(mockHash);
  
      // Call the function and expect the result
      const result = await client.getBlockHash(12345);
      expect(result).toEqual(mockHash);
    });
  
    it('throws an error if the call to the RPC server fails', async () => {
      // Mock the client
      const client = new RpcClient('http://localhost:8332', 'myusername', 'mypassword');
      client.call = jest.fn().mockRejectedValue(new Error('RPC error'));
  
      // Call the function and expect an error to be thrown
      await expect(client.getBlockHash(12345))
        .rejects.toThrow('Error calling getblockhash: RPC error');
    });
  });
  