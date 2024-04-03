'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

import BorrowModal from '../modal/BorrowModal';
import RepayModal from '../modal/RepayModal';
import SupplyModal from '../modal/SupplyModal';
import WithdrawModal from '../modal/WithdrawModal';

import { assetItemType } from '@/types/assetType';

type BorrowSupplyItemProps = {
  imageLink: string;
  assetName: string;
  apy: number;
  assetItemType: assetItemType;
  canBeCollateral?: boolean;
  walletBalance: string;
  isButtonDisabled: boolean;
  isBorrowSupplyCard?: boolean;
};

const BorrowSupplyItem: React.FC<BorrowSupplyItemProps> = (props) => {
  const [showSupplyModal, setShowSupplyModal] = useState<boolean>(false);
  const [showBorrowModal, setShowBorrowModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [showRepayModal, setShowRepayModal] = useState<boolean>(false);

  const supplyHandler = () => setShowSupplyModal(true);
  const borrowHandler = () => setShowBorrowModal(true);
  const withdrawHandler = () => setShowWithdrawModal(true);
  const repayHandler = () => setShowRepayModal(true);

  const submitHandler = () => {
    if (props.assetItemType === assetItemType.BORROW) {
      borrowHandler();
    } else {
      supplyHandler();
    }
  };

  return (
    <div className='flex p-3 rounded-md mb-2 items-center bg-[#2a2a2a]'>
      <div className='flex items-center gap-3 flex-[0.2]'>
        <Image
          src={props.imageLink}
          width={25}
          height={25}
          alt={props.assetName}
          className='rounded-full'
        />
        <p>{props.assetName}</p>
      </div>
      <p className='flex-[0.20]'>{props.walletBalance}</p>
      <p className='flex-[0.2]'>{props.apy}%</p>

      {props.canBeCollateral !== undefined && (
        <p className='flex-[0.15]'>
          {props.canBeCollateral ? <IoMdCheckmark /> : <RxCross2 />}
        </p>
      )}

      {/* <FaLock className='mr-3 text-xs text-[#707070]' /> */}
      <button
        disabled={props.isButtonDisabled}
        onClick={submitHandler}
        className='flex-[0.25] bg-white py-2 text-sm text-black rounded-md disabled:cursor-not-allowed disabled:bg-[#222222] disabled:text-gray-600'
      >
        {props.assetItemType}
      </button>

      {props.isBorrowSupplyCard &&
        props.assetItemType !== assetItemType.SUPPLY && (
          <button
            onClick={repayHandler}
            className='flex-[0.20] ml-2 bg-[#1e1e1e] border-[0.5px] border-white py-2 text-sm text-white rounded-md disabled:cursor-not-allowed disabled:bg-[#222222] disabled:text-gray-600'
          >
            Repay
          </button>
        )}

      {props.isBorrowSupplyCard &&
        props.assetItemType !== assetItemType.BORROW && (
          <button
            onClick={withdrawHandler}
            className='flex-[0.20] ml-2 bg-[#1e1e1e] border-[0.5px] border-white py-2 text-sm text-white rounded-md disabled:cursor-not-allowed disabled:bg-[#222222] disabled:text-gray-600'
          >
            Withdraw
          </button>
        )}

      {showSupplyModal && (
        <SupplyModal
          balance={props.walletBalance}
          isModalOpen={showSupplyModal}
          onClose={() => setShowSupplyModal(false)}
          apy={props.apy}
        />
      )}
      {showBorrowModal && (
        <BorrowModal
          isModalOpen={showBorrowModal}
          onClose={() => setShowBorrowModal(false)}
          apy={props.apy}

        />
      )}
      {showWithdrawModal && (
        <WithdrawModal
          isModalOpen={showWithdrawModal}
          onClose={() => setShowWithdrawModal(false)}
          apy={props.apy}

        />
      )}
      {showRepayModal && (
        <RepayModal
          isModalOpen={showRepayModal}
          onClose={() => setShowRepayModal(false)}
          apy={props.apy}

        />
      )}
    </div>
  );
};

export default BorrowSupplyItem;
