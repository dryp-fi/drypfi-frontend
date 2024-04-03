'use client';

import { ChainID } from '@covalenthq/client-sdk';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { tokenList } from '@/constants/tokens/token-list';
import aave from '@/contracts/aave/balance';
import { chainInfo } from '@/helpers/chain-info';
import { tokenActions } from '@/redux/features/token-slice';
import { getWalletBalance as balance } from '@/tools/covalent/balance';

import { TTokenBalance } from '@/types/token-list';

export const useFetchWalletBalance = (
  chainId: number | undefined,
  userAddress: `0x${string}` | undefined,
) => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchBalance = async () => {
    if (!chainId || !userAddress) return;

    // const data = await getWalletBalance(chainId, userAddress);

    const data = await balance(chainId as ChainID, userAddress);

    const filteredTokens = data?.filter(
      (token) =>
        token.contract_ticker_symbol === 'ETH' ||
        'WETH' ||
        'USDC' ||
        'USDT' ||
        'WBTC',
    );

    const formattedTokens = tokenList.map((token) => {
      const tokenInWallet = filteredTokens?.find(
        (token2) => token2.contract_ticker_symbol === token.symbol,
      );

      if (tokenInWallet) {
        return {
          symbol: token.symbol,
          thumbnail: token.thumbnail,
          decimals: token.decimals,
          token_address: tokenInWallet.contract_address,
          balance: tokenInWallet.balance,
        };
      }

      return {
        symbol: token.symbol,
        thumbnail: token.thumbnail,
        decimals: token.decimals,
        token_address: null,
        balance: '0',
      };
    });

    return formattedTokens;
  };

  const fetchTokensData = async () => {
    if (!chainId) return;

    const chainDetails = chainInfo(chainId);

    if (!chainDetails) return;

    //* addresses on base
    const WETH = '0x4200000000000000000000000000000000000006';
    const USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

    const data = await aave.getReserveData(chainDetails.viemChain, [
      WETH,
      USDC,
    ]);

    return data;
  };

  const fetchDetails = async () => {
    const formattedTokens = (await fetchBalance()) as TTokenBalance[];
    const tokensData = await fetchTokensData();

    formattedTokens[0].lendApy = Number(
      ethers
        .formatUnits(tokensData[0].currentLiquidityRate, 25)
        .substring(0, 4),
    );
    formattedTokens[0].borrowApy = Number(
      ethers
        .formatUnits(tokensData[0].currentVariableBorrowRate, 25)
        .substring(0, 4),
    );

    formattedTokens[1].lendApy = Number(
      ethers
        .formatUnits(tokensData[1].currentLiquidityRate, 25)
        .substring(0, 4),
    );
    formattedTokens[1].borrowApy = Number(
      ethers
        .formatUnits(tokensData[1].currentVariableBorrowRate, 25)
        .substring(0, 4),
    );

    formattedTokens[2].lendApy = Number(
      ethers
        .formatUnits(tokensData[0].currentLiquidityRate, 25)
        .substring(0, 4),
    );
    formattedTokens[2].borrowApy = Number(
      ethers
        .formatUnits(tokensData[0].currentVariableBorrowRate, 25)
        .substring(0, 4),
    );

    formattedTokens[3].lendApy = 4.73;
    formattedTokens[3].borrowApy = 5.44;

    formattedTokens[4].lendApy = 0.41;
    formattedTokens[4].borrowApy = 1.23;

    dispatch(tokenActions.setTokenList(formattedTokens as TTokenBalance[]));
    setIsUpdated(true);
  };

  useEffect(() => {
    if (chainId && userAddress) {
      fetchDetails();
    }
    //eslint-disable-next-line
  }, [chainId, userAddress]);

  return { isUpdated };
};
