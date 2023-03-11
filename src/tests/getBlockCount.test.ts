import { RpcClient } from '../rpcclient';

describe('getBlockCount', () => {
    it('returns the correct block count', async () => {
      // Mock data
      const mockBlockCount = 12345;
  
      // Mock the client
      const client = new RpcClient('http://localhost:8332', 'myusername', 'mypassword');
      client.call = jest.fn().mockResolvedValue(mockBlockCount);
  
      // Call the function and expect the result
      const result = await client.getBlockCount();
      expect(result).toEqual(mockBlockCount);
    });
  
    it('throws an error if the call to the RPC server fails', async () => {
      // Mock the client
      const client = new RpcClient('http://localhost:8332', 'myusername', 'mypassword');
      client.call = jest.fn().mockRejectedValue(new Error('RPC error'));
  
      // Call the function and expect an error to be thrown
      await expect(client.getBlockCount()).rejects.toThrow('Error calling getblockcount: RPC error');
    });
  });
  