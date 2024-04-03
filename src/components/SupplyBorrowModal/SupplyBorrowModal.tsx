'use client';

import { getButtonSettings } from '@/helpers/helperFunctions';

import InformationRow from './InformationRow';
import InputField from './InputField';
import SectionContainer from './SectionContainer';
import Loader from '../(ui)/Loader';
import Modal from '../(ui)/Modal';

import { assetItemType } from '@/types/assetType';

export type SupplyBorrowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: assetItemType;
  balance: number;
  APY?: number;
  healthFactor: number;
  submitHandler: () => void;
  setInputAmount: (amount: string) => void;
  inputAmount: string;
  isApproved?: boolean;
  approveHandler?: () => void;
  loading?: boolean;
};

const SupplyBorrowModal: React.FC<SupplyBorrowModalProps> = (props) => {
  const { buttonText, buttonHandler } = getButtonSettings(props);

  return (
    <Modal
      onClose={props.onClose}
      isOpen={props.isOpen}
      className='p-6 rounded-md bg-[#151515] w-[500px]'
    >
      <p className='font-semibold text-xl mb-4'>{props.type} asset</p>

      <p className='text-sm text-[#707070]'>Amount</p>
      <InputField
        inputAmount={props.inputAmount}
        setInputAmount={props.setInputAmount}
        actionType={props.type}
        balance={props.balance}
      />

      <SectionContainer title='Transaction Overview'>
        {props.type !== assetItemType.REPAY &&
        props.type !== assetItemType.WITHDRAW ? (
          <InformationRow label={`${props.type} APY`} value={`${props.APY}%`} />
        ) : null}

        {props.type === assetItemType.WITHDRAW ? (
          <InformationRow label='Supply APY' value={`${props.APY}%`} />
        ) : null}

        {props.type === assetItemType.REPAY ? (
          <InformationRow label='Borrow APY' value={`${props.APY}%`} />
        ) : null}

        {props.type === assetItemType.SUPPLY ? (
          <InformationRow label='Collateralization' value='Enabled' />
        ) : null}

        <InformationRow
          label='Health Factor'
          value={props.healthFactor}
          isGreen
        />
      </SectionContainer>

      <button
        onClick={buttonHandler}
        className='bg-white w-full mt-6 text-black py-3 rounded-md'
      >
        {props.loading ? <Loader inComp={true} /> : buttonText}
      </button>
    </Modal>
  );
};

export default SupplyBorrowModal;
