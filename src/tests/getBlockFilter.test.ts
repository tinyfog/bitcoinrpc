import { RpcClient } from '../rpcclient';
import { BlockFilter } from '../types';

describe('getBlockFilter', () => {
  it('returns a valid block filter', async () => {
    // Mock data
    const mockFilter: BlockFilter = {
      filter: '0101010101010101010101010101010101010101010101010101010101010101',
      header: '0101010101010101010101010101010101010101010101010101010101010101'
    };

    // Mock the client
    const client = new RpcClient('http://localhost:8332', 'myusername', 'mypassword');
    client.call = jest.fn().mockResolvedValue(mockFilter);

    // Call the function and expect the result
    const result = await client.getBlockFilter('0000000000000000000000000000000000000000000000000000000000000000');
    expect(result).toEqual(mockFilter);
  });

  it('throws an error if the call to the RPC server fails', async () => {
    // Mock the client
    const client = new RpcClient('http://localhost:8332', 'myusername', 'mypassword');
    client.call = jest.fn().mockRejectedValue(new Error('RPC error'));

    // Call the function and expect an error to be thrown
    await expect(client.getBlockFilter('0000000000000000000000000000000000000000000000000000000000000000'))
      .rejects.toThrow('Error calling getblockfilter: RPC error');
  });
});
