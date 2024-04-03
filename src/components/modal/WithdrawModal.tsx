import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAccount } from 'wagmi';

import 'react-toastify/dist/ReactToastify.css';

import aToken from '@/contracts/aave/atoken';
import sourceContract from '@/contracts/sourceContract';
import { chainInfo } from '@/helpers/chain-info';

import SupplyBorrowModal from '../SupplyBorrowModal/SupplyBorrowModal';

import { assetItemType } from '@/types/assetType';

type WithdrawModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
  apy: number;
};

const WithdrawModal: React.FC<WithdrawModalProps> = (props) => {
  const { chainId, address } = useAccount();
  const [inputAmount, setInputAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const withdrawWETHHandler = async () => {
    try {
      if (!chainId || !address) return;

      const chainDetails = chainInfo(chainId);
      const baseChainDetails = chainInfo(8453);

      if (
        !chainDetails ||
        !chainDetails.tokens ||
        !baseChainDetails ||
        !baseChainDetails.tokens ||
        !baseChainDetails.contracts.BALANCE_DESTINATION_BASE ||
        !chainDetails.contracts.SOURCE_DESTINATION
      )
        return;

      setLoading(true);

      await aToken.transfer(baseChainDetails?.viemChain, chainId, inputAmount);

      await sourceContract.withdrawTokens({
        chain: chainDetails.viemChain,
        contractAddress: chainDetails.contracts.SOURCE_CONTRACT,
        user: address,
        token: chainDetails.tokens.WETH.address,
        tokenDestination: baseChainDetails.tokens.WETH.address,
        amount: inputAmount,
        destinationChainSelector: BigInt(baseChainDetails.chainSelector),
        calledChainSelector: BigInt(chainDetails.chainSelector),
        receiver: baseChainDetails.contracts.BALANCE_DESTINATION_BASE,
        calledReceiver: chainDetails.contracts.SOURCE_DESTINATION,
        gasFeeAmount: 2000000,
      });

      setLoading(false);
      toast.success('Withdrawal successfull!');
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Withdrawal failed!');
    }
  };

  return (
    <>
      <SupplyBorrowModal
        inputAmount={inputAmount}
        submitHandler={withdrawWETHHandler}
        balance={23.34}
        APY={props.apy}
        healthFactor={6.4}
        type={assetItemType.WITHDRAW}
        onClose={props.onClose}
        isOpen={props.isModalOpen}
        setInputAmount={setInputAmount}
        loading={loading}
      />
      <ToastContainer theme='dark' position='bottom-right' />
    </>
  );
};

export default WithdrawModal;
