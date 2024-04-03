export type TToken = {
  [key: string]: {
    address: `0x${string}`;
  };
};

export const tokenInfo = (chainId: number): TToken | undefined => {
  switch (chainId) {
    case 42161:
      return {
        WETH: {
          address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
        },
        USDC: {
          address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        },
      };
    case 10:
      return {
        WETH: {
          address: '0x4200000000000000000000000000000000000006',
        },
        USDC: {
          address: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
        },
      };
    case 8453:
      return {
        WETH: {
          address: '0x4200000000000000000000000000000000000006',
        },
        USDC: {
          address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
        },
      };
    default:
      return undefined;
  }
};
