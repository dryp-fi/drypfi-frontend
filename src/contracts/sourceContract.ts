import { ethers } from 'ethers';
import { Chain, getAddress } from 'viem';

import { walletClient } from '@/config/client';
import { SOURCE_CONTRACT_ABI } from '@/constants/abi/source';

type TLendTokenParams = {
  chain: Chain;
  contractAddress: `0x${string}`;
  lendData: {
    token: `0x${string}`;
    usdcToken: `0x${string}`;
    usdcTokenDestination: `0x${string}`;
    user: `0x${string}`;
  };
  amount: string;
  destinationChainSelector: bigint;
  receiver: `0x${string}`;
  gasFeeAmount: number;
};

type TBorrowTokenParams = {
  chain: Chain;
  contractAddress: `0x${string}`;
  borrowData: {
    token: `0x${string}`;
    tokenDestination: `0x${string}`;
    amount: string;
    user: `0x${string}`;
  };
  destinationChainSelector: bigint;
  calledChainSelector: bigint;
  receiver: `0x${string}`;
  calledReceiver: `0x${string}`;
  gasFeeAmount: number;
};

type TRepayBorrowTokenParams = {
  chain: Chain;
  contractAddress: `0x${string}`;
  user: `0x${string}`;
  token: `0x${string}`;
  tokenDestination: `0x${string}`;
  amount: string;
  destinationChainSelector: bigint;
  receiver: `0x${string}`;
  gasFeeAmount: number;
};

type TWithdrawTokenParams = {
  chain: Chain;
  contractAddress: `0x${string}`;
  user: `0x${string}`;
  token: `0x${string}`;
  tokenDestination: `0x${string}`;
  amount: string;
  destinationChainSelector: bigint;
  calledChainSelector: bigint;
  receiver: `0x${string}`;
  calledReceiver: `0x${string}`;
  gasFeeAmount: number;
};

const lendToken = async (lendTokenData: TLendTokenParams) => {
  try {
    const client = walletClient(lendTokenData.chain);
    const [address] = await client.getAddresses();

    const amountInWei = ethers.parseUnits(lendTokenData.amount, 18); //* token is WETH as of now

    await client.writeContract({
      address: lendTokenData.contractAddress,
      abi: SOURCE_CONTRACT_ABI,
      functionName: 'lendToken',
      args: [
        [
          lendTokenData.lendData.token,
          lendTokenData.lendData.usdcToken,
          lendTokenData.lendData.usdcTokenDestination,
          lendTokenData.lendData.user,
        ],
        amountInWei,
        lendTokenData.destinationChainSelector,
        lendTokenData.receiver,
        lendTokenData.gasFeeAmount,
      ],
      // gas: BigInt(2095197),
      account: address,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
};

const borrowToken = async (borrowTokenData: TBorrowTokenParams) => {
  try {
    const client = walletClient(borrowTokenData.chain);
    const [address] = await client.getAddresses();

    const amountInWei = ethers.parseUnits(borrowTokenData.borrowData.amount, 6); //* user can only borrow usdc as of now

    await client.writeContract({
      address: borrowTokenData.contractAddress,
      abi: SOURCE_CONTRACT_ABI,
      functionName: 'borrowTokenMessage',
      args: [
        [
          getAddress(borrowTokenData.borrowData.token),
          getAddress(borrowTokenData.borrowData.tokenDestination),
          amountInWei,
          getAddress(borrowTokenData.borrowData.user),
        ],
        borrowTokenData.destinationChainSelector,
        borrowTokenData.calledChainSelector,
        getAddress(borrowTokenData.receiver),
        getAddress(borrowTokenData.calledReceiver),
        borrowTokenData.gasFeeAmount,
      ],
      account: address,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
};

const withdrawTokens = async (withdrawTokenData: TWithdrawTokenParams) => {
  try {
    const client = walletClient(withdrawTokenData.chain);
    await client.switchChain({ id: withdrawTokenData.chain.id });

    const [address] = await client.getAddresses();

    const amountInWei = ethers.parseUnits(withdrawTokenData.amount, 18); //* token is WETH as of now

    await client.writeContract({
      address: withdrawTokenData.contractAddress,
      abi: SOURCE_CONTRACT_ABI,
      functionName: 'withdrawMessage',
      args: [
        withdrawTokenData.user,
        withdrawTokenData.token,
        withdrawTokenData.tokenDestination,
        amountInWei,
        withdrawTokenData.destinationChainSelector,
        withdrawTokenData.calledChainSelector,
        withdrawTokenData.receiver,
        withdrawTokenData.calledReceiver,
        withdrawTokenData.gasFeeAmount,
      ],
      account: address,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
};

const repayBorrow = async (repayBorrowTokenData: TRepayBorrowTokenParams) => {
  try {
    const client = walletClient(repayBorrowTokenData.chain);
    const [address] = await client.getAddresses();

    const amountInWei = ethers.parseUnits(repayBorrowTokenData.amount, 6); //* repay will be in USDC as of now

    await client.writeContract({
      address: repayBorrowTokenData.contractAddress,
      abi: SOURCE_CONTRACT_ABI,
      functionName: 'rePayBorrow',
      args: [
        repayBorrowTokenData.user,
        repayBorrowTokenData.token,
        repayBorrowTokenData.tokenDestination,
        amountInWei,
        repayBorrowTokenData.destinationChainSelector,
        repayBorrowTokenData.receiver,
        repayBorrowTokenData.gasFeeAmount,
      ],
      account: address,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }
};

const sourceContract = { lendToken, borrowToken, withdrawTokens, repayBorrow };

export default sourceContract;
