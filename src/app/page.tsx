'use client';

import { useAccount } from 'wagmi';

import { useGetUserStats } from '@/hooks/useGetUserStats';

import AssetsListCard from '@/components/Cards/AssetsListCard';
import BorrowCard from '@/components/Cards/BorrowCard';
import SupplyCard from '@/components/Cards/SupplyCard';
import HeaderCard from '@/components/Header/HeaderCard';

import { assetItemType } from '@/types/assetType';

const Home = () => {
  const { address, isConnected, chainId } = useAccount();
  const { stats } = useGetUserStats(8453, address);

  return (
    <div className='p-4 '>
      <HeaderCard address={address} isConnected={isConnected} stats={stats} />
      <div className='flex px-28 gap-5 -top-10 relative'>
        <SupplyCard stats={stats} />
        <BorrowCard stats={stats} />
      </div>

      <div className='flex px-28 gap-5 relative -top-5 '>
        <AssetsListCard
          assetCardType={assetItemType.SUPPLY}
          isConnected={isConnected}
          address={address}
          chainId={chainId}
        />
        <AssetsListCard
          assetCardType={assetItemType.BORROW}
          isConnected={isConnected}
          address={address}
          chainId={chainId}
        />
      </div>
    </div>
  );
};

export default Home;
