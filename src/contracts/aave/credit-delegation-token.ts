import { ethers } from 'ethers';
import { Chain } from 'viem';
import { base } from 'viem/chains';

import { publicClient, walletClient } from '@/config/client';
import { V_TOKEN_USDC_BASE } from '@/constants';
import { CREDIT_DELEGATION_TOKEN_ABI } from '@/constants/abi/credit-delegation.token';

const checkBorrowAllowance = async (
  chain: Chain,
  fromUser: `0x${string}`,
  toUser: `0x${string}`,
) => {
  const client = publicClient(chain, process.env.NEXT_PUBLIC_BASE_URL);

  const data = await client.readContract({
    address: V_TOKEN_USDC_BASE,
    abi: CREDIT_DELEGATION_TOKEN_ABI,
    functionName: 'borrowAllowance',
    args: [fromUser, toUser],
  });

  return data as string;
};

const approveDelegationAllowance = async (
  chain: Chain,
  prevChainId: number,
  delegatee: `0x${string}`,
) => {
  const client = walletClient(chain);
  const [address] = await client.getAddresses();

  //* switch chain to base
  await client.switchChain({ id: base.id });

  //* let user give the approval
  await client.writeContract({
    address: V_TOKEN_USDC_BASE,
    abi: CREDIT_DELEGATION_TOKEN_ABI,
    functionName: 'approveDelegation',
    args: [delegatee, ethers.MaxUint256],
    account: address,
  });

  //* switch chain to the previous chain again
  await client.switchChain({ id: prevChainId });
};

const creditDelegation = { checkBorrowAllowance, approveDelegationAllowance };

export default creditDelegation;
