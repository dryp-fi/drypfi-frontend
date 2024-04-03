import { assetItemType } from '@/types/assetType';
import { TStats } from '@/types/stats';

export const convertStatsToArray = (stats: TStats) => {
  const { netWorth, netApy } = stats;

  return [
    {
      label: 'Net worth',
      value: netWorth ? `$${netWorth}` : '-',
      valueColor: 'text-white',
      description: "Total net-worth on Base chain"
    },
    {
      label: 'Net APY',
      value: netApy !== null ? `${netApy} %` : '-',
      valueColor: 'text-white',
      description: "Net APY percentage on Base chain"

    },
  ];
};

export const getButtonSettings = (props: any) => {
  let buttonText = '';
  let buttonHandler = props.submitHandler;

  switch (props.type) {
    case assetItemType.SUPPLY:
      buttonText = props.isApproved ? 'Supply WETH' : 'Approve WETH';
      buttonHandler = props.isApproved
        ? props.submitHandler
        : props.approveHandler;
      break;
    case assetItemType.BORROW:
      buttonText = props.isApproved ? 'Borrow USDC' : 'Approve USDC';
      buttonHandler = props.isApproved
        ? props.submitHandler
        : props.approveHandler;
      break;
    case assetItemType.REPAY:
      buttonText = props.isApproved ? 'Repay USDC' : 'Approve USDC';
      buttonHandler = props.isApproved
        ? props.submitHandler
        : props.approveHandler;
      break;
    default:
      buttonText = 'Withdraw WETH';
  }

  return { buttonText, buttonHandler };
};
