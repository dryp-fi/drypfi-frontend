import React from 'react';

import { useTokenStore } from '@/redux/hooks';

import BorrowSupplyCard from './BorrowSupplyCard';

import { assetItemType } from '@/types/assetType';
import { TStats } from '@/types/stats';

type supplyCardProps = {
  stats: TStats;
};

const SupplyCard: React.FC<supplyCardProps> = (props) => {
  const { tokensBalance } = useTokenStore();

  const [weth] = tokensBalance.filter((token) => token.symbol === 'WETH');

  return (
    <BorrowSupplyCard
      cardType={assetItemType.SUPPLY}
      assetName='WETH'
      imageLink='/assets/images/weth.png'
      balance={
        props.stats.totalCollateral
          ? '$ ' + props.stats.totalCollateral.toString()
          : '$ 0'
      }
      canBeCollateral={true}
      apy={weth && weth.lendApy ? weth.lendApy : 0}
    />
  );
};

export default SupplyCard;
