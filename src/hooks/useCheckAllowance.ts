import { useEffect, useState } from 'react';

import erc20 from '@/contracts/erc20';
import { chainInfo } from '@/helpers/chain-info';

export const useCheckAllowance = (
  chainId: number | undefined,
  token: string,
  owner: `0x${string}` | undefined,
) => {
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [approvedAmount, setApprovedAmount] = useState<bigint>(BigInt(0));

  const checkApproval = async () => {
    if (!chainId || !owner) return;

    const chainDetails = chainInfo(chainId);
    if (!chainDetails || !chainDetails.tokens) return;

    const tokenDetails = chainDetails.tokens[token];
    const spender = chainDetails.contracts?.SOURCE_CONTRACT;
    if (!tokenDetails || !spender) return;

    const allowance = await erc20.allowance(
      chainDetails.viemChain,
      tokenDetails.address,
      owner,
      spender,
    );

    if (allowance > BigInt(0)) {
      setIsApproved(true);
      setApprovedAmount(allowance);
    }
  };

  useEffect(() => {
    if (owner && chainId) {
      checkApproval();
    }
    //eslint-disable-next-line
  }, [owner, chainId]);

  return { isApproved, approvedAmount };
};
