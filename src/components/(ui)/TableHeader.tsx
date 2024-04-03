import React from 'react';

import { assetItemType } from '@/types/assetType';

type tableHeaderProps = {
  isBorrowSupplyCard?: boolean;
  itemType: string;
};

const TableHeader: React.FC<tableHeaderProps> = ({
  isBorrowSupplyCard,
  itemType,
}) => {
  return (
    <div className='flex items-center my-2'>
      <p className='flex-[0.2] pl-1 text-sm text-[#707070]'>Asset</p>
      <p className='flex-[0.2] pl-1 text-sm text-[#707070]'>Balance</p>
      <p className='flex-[0.15] pl-1 text-sm text-[#707070]'>APY</p>

      {!isBorrowSupplyCard && (
        <p className='flex-[0.25] pl-1 text-sm text-[#707070]'>
          {itemType === assetItemType.SUPPLY
            ? 'Can be collateral'
            : 'Can be borrowed'}
        </p>
      )}
    </div>
  );
};

export default TableHeader;
