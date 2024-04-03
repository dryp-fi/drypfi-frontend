import React from 'react';

import { useTokenStore } from '@/redux/hooks';

import BorrowSupplyCard from './BorrowSupplyCard';

import { assetItemType } from '@/types/assetType';
import { TStats } from '@/types/stats';

type borrowCardProps = {
  stats: TStats;
};

const BorrowCard: React.FC<borrowCardProps> = (props) => {
  const { tokensBalance } = useTokenStore();

  const [usdc] = tokensBalance.filter((token) => token.symbol === 'USDC');

  return (
    <BorrowSupplyCard
      cardType={assetItemType.BORROW}
      assetName='USDC'
      imageLink='/assets/images/usdc.png'
      balance={
        props.stats.totalDebt ? '$ ' + props.stats.totalDebt.toString() : '$ 0'
      }
      canBeCollateral={false}
      apy={usdc && usdc.borrowApy ? usdc.borrowApy : 0}
    />
  );
};

export default BorrowCard;
