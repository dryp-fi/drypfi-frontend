import { Chain, getContract } from 'viem';

import { publicClient, publicClientMulti } from '@/config/client';
import { BALANCE_BASE } from '@/constants';
import { BALANCE_BASE_ABI } from '@/constants/abi/balance';

const getUserAccount = async (chain: Chain, userAddress: `0x${string}`) => {
  const client = publicClient(chain, process.env.NEXT_PUBLIC_BASE_RPC);

  const userDetails = await client.readContract({
    address: BALANCE_BASE,
    abi: BALANCE_BASE_ABI,
    functionName: 'getUserAccount',
    args: [userAddress],
  });

  return userDetails as any;
};

const getReserveData = async (
  chain: Chain,
  assetAddress: Array<`0x${string}`>,
) => {
  const client = publicClientMulti(chain, process.env.NEXT_PUBLIC_BASE_RPC);

  const contract = getContract({
    address: BALANCE_BASE,
    abi: BALANCE_BASE_ABI,
    client: client,
  });

  const contractCalls = assetAddress.map((asset) =>
    contract.read.getReserveData([asset]),
  );

  const tokenDetails = await Promise.all(contractCalls);

  return tokenDetails as any;
};

const aave = { getUserAccount, getReserveData };

export default aave;
