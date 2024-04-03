'use client';

import { ethers } from 'ethers';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAccount } from 'wagmi';

import 'react-toastify/dist/ReactToastify.css';

import { useCheckBorrowAllowance } from '@/hooks/useCheckBorrowAllowance';

import { BALANCE_BASE, BALANCE_DESTINATION_BASE } from '@/constants';
import creditDelegation from '@/contracts/aave/credit-delegation-token';
import sourceContract from '@/contracts/sourceContract';
import { chainInfo } from '@/helpers/chain-info';

import SupplyBorrowModal from '../SupplyBorrowModal/SupplyBorrowModal';

import { assetItemType } from '@/types/assetType';

type BorrowModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
  apy: number;
};

const BorrowModal: React.FC<BorrowModalProps> = (props) => {
  const { chainId, address } = useAccount();
  const [inputAmount, setInputAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { approvedAmount } = useCheckBorrowAllowance(
    8453,
    address,
    BALANCE_BASE,
  );

  const approveDelegation = async () => {
    try {
      setLoading(true);
      if (!chainId || !address) return;

      const chainDetails = chainInfo(8453);
      if (!chainDetails) return;

      await creditDelegation.approveDelegationAllowance(
        chainDetails.viemChain,
        chainId,
        BALANCE_BASE,
      );
      setLoading(false);
      toast.success('Delegation successfull!');
    } catch (error) {
      toast.error('Approval delegation failed!');
      setLoading(false);
      throw new Error('Approval delegation failed!');
    }
  };

  const borrowUSDCHandler = async () => {
    try {
      if (inputAmount === '') {
        toast.error('Please enter the input amount');
        setLoading(false);
        return;
      }

      if (!chainId || !address) {
        toast.error('Wallet not connected');
        setLoading(false);
        return;
      }

      if (approvedAmount < ethers.parseUnits(inputAmount, 6)) {
        await approveDelegation();
      }
      setLoading(true);

      const chainDetails = chainInfo(chainId);
      const baseChainDetails = chainInfo(8453);

      if (
        !chainDetails ||
        !chainDetails.tokens ||
        !baseChainDetails ||
        !baseChainDetails.tokens ||
        !chainDetails.contracts.SOURCE_DESTINATION ||
        !chainDetails.contracts.SOURCE_CONTRACT
      ) {
        toast.error('Invalid chain!');
        setLoading(false);
        return;
      }

      await sourceContract.borrowToken({
        chain: chainDetails.viemChain,
        contractAddress: chainDetails.contracts.SOURCE_CONTRACT,
        borrowData: {
          token: chainDetails.tokens.USDC.address,
          tokenDestination: baseChainDetails.tokens.USDC.address,
          amount: inputAmount.toString(),
          user: address,
        },
        destinationChainSelector: BigInt('15971525489660198786'), //* this will always be base
        calledChainSelector: BigInt(chainDetails.chainSelector),
        receiver: BALANCE_DESTINATION_BASE,
        calledReceiver: chainDetails.contracts?.SOURCE_DESTINATION,
        gasFeeAmount: 2000000,
      });
      setLoading(false);
      toast.success('Borrowed successfully!');
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Borrow failed!');
    }
  };

  return (
    <>
      <SupplyBorrowModal
        inputAmount={inputAmount}
        submitHandler={borrowUSDCHandler}
        balance={23.34}
        APY={props.apy}
        healthFactor={6.4}
        type={assetItemType.BORROW}
        onClose={props.onClose}
        isOpen={props.isModalOpen}
        setInputAmount={setInputAmount}
        loading={loading}
        approveHandler={approveDelegation}
        isApproved={
          approvedAmount >
          ethers.parseUnits(inputAmount === '' ? '0' : inputAmount, 6)
            ? true
            : false
        }
      />
      <ToastContainer theme='dark' position='bottom-right' />
    </>
  );
};

export default BorrowModal;
