import { ethers } from 'ethers';
import { Chain } from 'viem';

import { walletClient } from '@/config/client';
import { A_TOKEN_WETH_BASE, BALANCE_BASE } from '@/constants';
import { ATOKEN_ABI } from '@/constants/abi/atoken';

const transfer = async (chain: Chain, prevChainId: number, amount: string) => {
  try {
    const client = walletClient(chain);
    const [address] = await client.getAddresses();

    const amountInWei = ethers.parseUnits(amount, 18);

    await client.switchChain({ id: 8453 });

    await client.writeContract({
      address: A_TOKEN_WETH_BASE,
      abi: ATOKEN_ABI,
      functionName: 'transfer',
      args: [BALANCE_BASE, amountInWei],
      account: address,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
};

const aToken = { transfer };

export default aToken;
