import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import aave from '@/contracts/aave/balance';
import { chainInfo } from '@/helpers/chain-info';

import { TStats } from '@/types/stats';

export const useGetUserStats = (
  chainId: number | undefined,
  userAddress: `0x${string}` | undefined,
) => {
  const [stats, setStats] = useState<TStats>({
    netWorth: null,
    netApy: null,
    totalCollateral: null,
    totalDebt: null,
  });

  const getUserStats = async () => {
    if (!chainId) return;

    const chainDetails = chainInfo(8453);
    if (!chainDetails || !userAddress) return;

    const data = await aave.getUserAccount(chainDetails.viemChain, userAddress);

    setStats({
      netWorth: Number(
        ethers.formatUnits(data[0] - data[1], 8).substring(0, 5),
      ),
      netApy: 3.4,
      totalCollateral: Number(ethers.formatUnits(data[0], 8).substring(0, 5)),
      totalDebt: Number(ethers.formatUnits(data[1], 8).substring(0, 5)),
    });
  };

  useEffect(() => {
    if (userAddress && chainId) {
      getUserStats();
    }
    //eslint-disable-next-line
  }, [userAddress, chainId]);

  return { stats };
};
