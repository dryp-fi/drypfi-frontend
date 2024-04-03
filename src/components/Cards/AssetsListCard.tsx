'use client';

import { ethers } from 'ethers';

import { useFetchWalletBalance } from '@/hooks/useFetchWalletBalance';

import { useTokenStore } from '@/redux/hooks';

import TableHeader from '../(ui)/TableHeader';
import BorrowSupplyItem from '../Assets/BorrowSupplyItem';

import { assetItemType } from '@/types/assetType';

type assetListCardProps = {
  isConnected: boolean;
  address: `0x${string}` | undefined;
  assetCardType: assetItemType;
  chainId: number | undefined;
};

const AssetsListCard: React.FC<assetListCardProps> = (props) => {
  const { isUpdated } = useFetchWalletBalance(props.chainId, props.address);
  const { tokensBalance } = useTokenStore();

  return (
    <div className='w-full bg-[#1e1e1e] p-5 min-h-[300px] rounded-md'>
      <p className='font-semibold text-lg mb-4'>
        Assets to{' '}
        {props.assetCardType === assetItemType.BORROW ? 'borrow' : 'supply'}
      </p>

      <TableHeader itemType={props.assetCardType} />
      {props.assetCardType === assetItemType.SUPPLY ? (
        <>
          {tokensBalance.length > 0 &&
            tokensBalance.map((asset) => (
              <BorrowSupplyItem
                apy={asset.lendApy ? asset.lendApy : 0}
                assetItemType={assetItemType.SUPPLY}
                assetName={asset.symbol}
                imageLink={asset.thumbnail}
                walletBalance={
                  asset.balance !== undefined
                    ? ethers
                        .formatUnits(asset?.balance, asset.decimals)
                        .toString()
                        .substring(0, 5)
                    : '0'
                }
                key={asset.symbol}
                canBeCollateral={asset.symbol === 'WETH' ? true : false}
                isButtonDisabled={asset.symbol === 'WETH' ? false : true}
              />
            ))}
        </>
      ) : (
        <>
          {tokensBalance.length > 0 &&
            tokensBalance.map((asset) => (
              <BorrowSupplyItem
                apy={asset.borrowApy ? asset.borrowApy : 0}
                assetItemType={assetItemType.BORROW}
                assetName={asset.symbol}
                imageLink={asset.thumbnail}
                walletBalance={ethers
                  .formatUnits(asset.balance, asset.decimals)
                  .toString()
                  .substring(0, 5)}
                key={asset.symbol}
                isButtonDisabled={asset.symbol === 'USDC' ? false : true}
                canBeCollateral={asset.symbol === 'USDC' ? true : false}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default AssetsListCard;
