import { RpcClient } from '../rpcclient';


  describe('getBestBlockHash', () => {
    it('should return the best block hash', async () => {
      const mockResult = '0000000000000000000123456789abcdef0123456789abcdef0123456789abcdef';
      const mockCall = jest.fn().mockResolvedValue(mockResult);

      const client = new RpcClient('myusername', 'mypassword', 'http://127.0.0.1:8332');
      client.call = mockCall;

      const result = await client.getBestBlockHash();

      expect(mockCall).toHaveBeenCalledTimes(1);
      expect(mockCall).toHaveBeenCalledWith('getbestblockhash', []);

      expect(result).toEqual(mockResult);
    });

    it('should throw an error if the RPC call fails', async () => {
      const mockError = new Error('Failed to get best block hash');
      const mockCall = jest.fn().mockRejectedValue(mockError);

      const client = new RpcClient('myusername', 'mypassword', 'http://127.0.0.1:8332');
      client.call = mockCall;

      await expect(client.getBestBlockHash()).rejects.toThrow(
        `Error calling getbestblockhash: ${mockError.message}`
      );
    });
  });
