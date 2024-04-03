import { ethers } from 'ethers';
import { Chain } from 'viem';

import { publicClient, walletClient } from '@/config/client';
import { ERC20_ABI } from '@/constants/abi/erc20';

const allowance = async (
  chain: Chain,
  tokenAddress: `0x${string}`,
  owner: `0x${string}`,
  spender: `0x${string}`,
) => {
  const client = publicClient(chain);

  const allowance = await client.readContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [owner, spender],
  });

  return allowance as bigint;
};

const approve = async (
  chain: Chain,
  tokenAddress: `0x${string}`,
  spender: `0x${string}`,
) => {
  const client = walletClient(chain);
  const [address] = await client.getAddresses();

  await client.writeContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [spender, ethers.MaxUint256],
    account: address,
  });
};

const erc20 = { allowance, approve };

export default erc20;
