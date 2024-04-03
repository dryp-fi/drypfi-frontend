import Image from 'next/image';

import { assetItemType } from '@/types/assetType';

type InputFieldProps = {
  balance: number;
  actionType: assetItemType;
  setInputAmount: (amount: string) => void;
  inputAmount: string;
};

const InputField: React.FC<InputFieldProps> = ({
  balance,
  actionType,
  setInputAmount,
  inputAmount,
}) => (
  <div className='bg-[#1e1e1e] p-3 rounded-md mt-1 mb-4'>
    <div className='w-full flex justify-between'>
      <input
        onChange={(event) => {
          setInputAmount(event.target.value);
        }}
        value={inputAmount}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        placeholder='0.0'
        type='number'
        className='w-[80%] bg-transparent border-none outline-none p-2 text-2xl'
      />
      <div className='flex items-center gap-2'>
        <Image
          src={
            actionType === assetItemType.BORROW ||
            actionType === assetItemType.REPAY
              ? '/assets/images/usdc.png'
              : '/assets/images/weth.png'
          }
          height={30}
          width={30}
          alt={
            actionType === assetItemType.BORROW ||
            actionType === assetItemType.REPAY
              ? 'USDC'
              : 'WETH'
          }
          className='rounded-full'
        />
        <p className='text-lg font-semibold'>
          {actionType === assetItemType.BORROW ||
          actionType === assetItemType.REPAY
            ? 'USDC'
            : 'WETH'}
        </p>
      </div>
    </div>
    <div className='flex justify-between items-center text-xs text-[#707070] mt-1'>
      <p className='pl-2'>$0.0</p>
      <div className='flex items-center gap-2'>
        <p>Balance: {balance}</p>
        <p className='font-medium text-white cursor-pointer'>Max</p>
      </div>
    </div>
  </div>
);

export default InputField;
