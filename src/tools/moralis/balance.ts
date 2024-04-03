import Moralis from 'moralis';

export const getWalletBalance = async (
  chainId: number,
  address: `0x${string}`,
) => {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });
    }

    const nativeBalaceCall = Moralis.EvmApi.balance.getNativeBalance({
      chain: chainId,
      address,
    });

    const tokenBalanceCall = Moralis.EvmApi.token.getWalletTokenBalances({
      chain: chainId,
      address,
    });

    const [nativeBalance, tokenBalance] = await Promise.all([
      nativeBalaceCall,
      tokenBalanceCall,
    ]);

    return [
      {
        symbol: 'ETH',
        decimals: 18,
        balance: nativeBalance.raw.balance,
        token_address: null,
      },
      ...tokenBalance.raw,
    ];
  } catch (e) {
    console.error(e);
  }
};
