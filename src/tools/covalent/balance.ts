import { ChainID, CovalentClient } from '@covalenthq/client-sdk';

export const getWalletBalance = async (
  chainId: ChainID,
  walletAddress: `0x${string}`,
) => {
  const client = new CovalentClient(
    process.env.NEXT_PUBLIC_COVALENT_API_KEY as string,
  );
  const data = await client.BalanceService.getTokenBalancesForWalletAddress(
    chainId,
    walletAddress,
  );

  console.log('dad', data);
  return data.data.items;
};
