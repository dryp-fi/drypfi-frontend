'use client';

import React from 'react';

import TableHeader from '../(ui)/TableHeader';
import BorrowSupplyItem from '../Assets/BorrowSupplyItem';

import { assetItemType } from '@/types/assetType';

type BorrowSupplyCardProps = {
  cardType: assetItemType;
  assetName: string;
  imageLink: string;
  balance: string;
  canBeCollateral: boolean;
  apy: number;
};

const BorrowSupplyCard: React.FC<BorrowSupplyCardProps> = (props) => {
  return (
    <div className='w-full bg-[#1e1e1e] p-5 rounded-md'>
      <p className='font-semibold  mb-1'>
        Your {props.cardType === assetItemType.BORROW ? 'borrows' : 'supplies'}
      </p>

      <TableHeader isBorrowSupplyCard={true} itemType='' />
      <BorrowSupplyItem
        isButtonDisabled={false}
        apy={props.apy}
        assetItemType={props.cardType}
        assetName={props.assetName}
        imageLink={props.imageLink}
        walletBalance={props.balance}
        isBorrowSupplyCard
      />
    </div>
  );
};

export default BorrowSupplyCard;
