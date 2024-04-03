import { useEffect, useState } from 'react';

import creditDelegation from '@/contracts/aave/credit-delegation-token';
import { chainInfo } from '@/helpers/chain-info';

export const useCheckBorrowAllowance = (
  chainId: number | undefined,
  fromUser: `0x${string}` | undefined,
  toUser: `0x${string}`,
) => {
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [approvedAmount, setApprovedAmount] = useState<bigint>(BigInt(0));

  const checkBorrowAllowance = async () => {
    if (!chainId || !fromUser) return;

    const chainDetails = chainInfo(chainId);
    if (!chainDetails) return;

    const data = await creditDelegation.checkBorrowAllowance(
      chainDetails.viemChain,
      fromUser,
      toUser,
    );

    if (BigInt(data) > BigInt(0)) {
      setIsApproved(true);
      setApprovedAmount(BigInt(data));
    }
  };

  useEffect(() => {
    if (chainId && fromUser) {
      checkBorrowAllowance();
    }
    //eslint-disable-next-line
  }, [chainId, fromUser]);

  return { isApproved, approvedAmount };
};
