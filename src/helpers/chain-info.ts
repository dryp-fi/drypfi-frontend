import { arbitrum, base, optimism } from 'viem/chains';

import {
  AAVE_POOL_BASE,
  BALANCE_BASE,
  BALANCE_DESTINATION_BASE,
  chainIdArbitrum,
  chainIdBase,
  chainIdOptimism,
  SOURCE_CONTRACT_ARBITRUM,
  SOURCE_CONTRACT_OPTIMISM,
  SOURCE_DESTINATION_ARBITRUM,
  SOURCE_DESTINATION_OPTIMISM,
  V_TOKEN_USDC_BASE,
} from '@/constants';

import { tokenInfo } from './token-info';

export const chainInfo = (chainId: number) => {
  switch (chainId) {
    case 42161:
      return {
        name: 'Arbitrum',
        viemChain: arbitrum,
        tokens: tokenInfo(chainId),
        contracts: {
          SOURCE_CONTRACT: SOURCE_CONTRACT_ARBITRUM,
          SOURCE_DESTINATION: SOURCE_DESTINATION_ARBITRUM,
        },
        chainSelector: chainIdArbitrum,
      };
    case 10:
      return {
        name: 'Optimism',
        viemChain: optimism,
        tokens: tokenInfo(chainId),
        contracts: {
          SOURCE_CONTRACT: SOURCE_CONTRACT_OPTIMISM,
          SOURCE_DESTINATION: SOURCE_DESTINATION_OPTIMISM,
        },
        chainSelector: chainIdOptimism,
      };
    case 8453:
      return {
        name: 'Base',
        viemChain: base,
        tokens: tokenInfo(chainId),
        contracts: {
          BALANCE_BASE,
          BALANCE_DESTINATION_BASE,
          AAVE_POOL_BASE,
          V_TOKEN_USDC_BASE,
        },
        chainSelector: chainIdBase,
      };
  }
};
