import { ethers } from 'ethers';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAccount } from 'wagmi';

import 'react-toastify/dist/ReactToastify.css';

import { useCheckAllowance } from '@/hooks/useCheckAllowance';

import erc20 from '@/contracts/erc20';
import sourceContract from '@/contracts/sourceContract';
import { chainInfo } from '@/helpers/chain-info';
import { useTokenStore } from '@/redux/hooks';

import SupplyBorrowModal from '../SupplyBorrowModal/SupplyBorrowModal';

import { assetItemType } from '@/types/assetType';

type RepayModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
  apy: number;
};

const RepayModal: React.FC<RepayModalProps> = (props) => {
  const { chainId, address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<string>('');
  const { tokensBalance } = useTokenStore();
  const { approvedAmount } = useCheckAllowance(chainId, 'USDC', address);

  const [usdc] = tokensBalance.filter((token) => token.symbol === 'USDC');

  const approveHandler = async () => {
    try {
      if (!chainId) return;
      setLoading(true);

      const chainDetails = chainInfo(chainId);
      if (
        !chainDetails ||
        !chainDetails.tokens ||
        !chainDetails.contracts.SOURCE_CONTRACT
      )
        return;

      await erc20.approve(
        chainDetails.viemChain,
        chainDetails.tokens.USDC.address,
        chainDetails.contracts.SOURCE_CONTRACT,
      );
      setLoading(false);
    } catch (error) {
      toast.error('Approval failed');
      setLoading(false);
      throw new Error('Approval failed');
    }
  };

  const repayUSDCHandler = async () => {
    try {
      if (!chainId || !address) return;

      if (inputAmount === '') {
        toast.error('Please enter an input amount');
        return;
      }

      if (approvedAmount < ethers.parseUnits(inputAmount, 6)) {
        await approveHandler();
      }

      const chainDetails = chainInfo(chainId);
      const baseChainDetails = chainInfo(8453);
      if (
        !chainDetails ||
        !chainDetails.tokens ||
        !baseChainDetails ||
        !baseChainDetails.tokens ||
        !baseChainDetails.contracts.BALANCE_DESTINATION_BASE ||
        !chainDetails.contracts.SOURCE_CONTRACT
      )
        return;

      setLoading(true);

      await sourceContract.repayBorrow({
        chain: chainDetails.viemChain,
        contractAddress: chainDetails.contracts.SOURCE_CONTRACT,
        user: address,
        token: chainDetails.tokens.USDC.address,
        tokenDestination: baseChainDetails.tokens.USDC.address,
        amount: inputAmount,
        destinationChainSelector: BigInt(baseChainDetails.chainSelector),
        receiver: baseChainDetails.contracts.BALANCE_DESTINATION_BASE,
        gasFeeAmount: 2000000,
      });

      setLoading(false);
      toast.success('Repaid successfully!');
    } catch (error) {
      setLoading(false);
      toast.error('Repay failed!');
    }
  };

  return (
    <>
      <SupplyBorrowModal
        inputAmount={inputAmount}
        submitHandler={repayUSDCHandler}
        balance={Number(usdc.balance)}
        APY={props.apy}
        healthFactor={6.4}
        type={assetItemType.REPAY}
        onClose={props.onClose}
        isOpen={props.isModalOpen}
        setInputAmount={setInputAmount}
        loading={loading}
        approveHandler={approveHandler}
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

export default RepayModal;
