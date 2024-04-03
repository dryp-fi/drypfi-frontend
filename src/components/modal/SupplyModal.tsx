'use client';

import { ethers } from 'ethers';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAccount } from 'wagmi';

import 'react-toastify/dist/ReactToastify.css';

import { useCheckAllowance } from '@/hooks/useCheckAllowance';

import { BALANCE_DESTINATION_BASE } from '@/constants';
import erc20 from '@/contracts/erc20';
import sourceContract from '@/contracts/sourceContract';
import { chainInfo } from '@/helpers/chain-info';
import { tokenInfo } from '@/helpers/token-info';

import SupplyBorrowModal from '../SupplyBorrowModal/SupplyBorrowModal';

import { assetItemType } from '@/types/assetType';

type SupplyModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
  balance: string;
  apy: number;
};

const SupplyModal: React.FC<SupplyModalProps> = (props) => {
  const [inputAmount, setInputAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { address, chainId } = useAccount();
  const { approvedAmount } = useCheckAllowance(chainId, 'WETH', address);
  const { isApproved } = useCheckAllowance(chainId, 'WETH', address);

  const approveHandler = async () => {
    try {
      setLoading(true);
      if (!chainId) return;

      const chainDetails = chainInfo(chainId);
      const spender = chainDetails?.contracts?.SOURCE_CONTRACT;
      if (!chainDetails || !chainDetails.tokens || !spender) return;

      await erc20.approve(
        chainDetails.viemChain,
        chainDetails.tokens.WETH.address,
        spender,
      );
      setLoading(false);
      toast.success('Approved successfully!');
    } catch (error) {
      toast.error('Approval failed!');
      setLoading(false);
      throw new Error('Approval failed');
    }
  };

  const supplyETHHandler = async () => {
    try {
      if (!chainId || !address) return;

      if (inputAmount === '') {
        toast.error('Please enter an input amount');
        setLoading(false);
        return;
      }

      if (approvedAmount < ethers.parseUnits(inputAmount, 18)) {
        await approveHandler();
      }
      setLoading(true);

      const chainDetails = chainInfo(chainId);
      const baseChainDetails = chainInfo(8453);
      const srcTokens = tokenInfo(chainId);
      const destTokens = tokenInfo(8453); //* base chain is dest chain

      if (
        !chainDetails ||
        !baseChainDetails ||
        !baseChainDetails.tokens ||
        !srcTokens ||
        !destTokens ||
        !chainDetails.contracts.SOURCE_CONTRACT
      )
        return;

      await sourceContract.lendToken({
        chain: chainDetails?.viemChain,
        contractAddress: chainDetails.contracts.SOURCE_CONTRACT,
        lendData: {
          token: srcTokens.WETH.address,
          usdcToken: srcTokens.USDC.address,
          usdcTokenDestination: baseChainDetails.tokens.USDC.address,
          user: address,
        },
        amount: inputAmount.toString(),
        destinationChainSelector: BigInt('15971525489660198786'), //*base(destination) chain selector
        receiver: BALANCE_DESTINATION_BASE,
        gasFeeAmount: 2000000,
      });
      setLoading(false);
      toast.success('Supplied WETH successfully!');
    } catch (error) {
      setLoading(false);
      toast.error('Supply failed!');
      console.error('error', error);
    }
  };

  return (
    <>
      <SupplyBorrowModal
        setInputAmount={setInputAmount}
        inputAmount={inputAmount}
        submitHandler={supplyETHHandler}
        balance={Number(props.balance.substring(2))}
        APY={props.apy}
        healthFactor={6.4}
        type={assetItemType.SUPPLY}
        onClose={props.onClose}
        isOpen={props.isModalOpen}
        approveHandler={approveHandler}
        isApproved={
          approvedAmount >
          ethers.parseUnits(inputAmount === '' ? '0' : inputAmount, 18)
            ? true
            : false
        }
        loading={loading}
      />
      <ToastContainer theme='dark' position='bottom-right' />
    </>
  );
};

export default SupplyModal;
