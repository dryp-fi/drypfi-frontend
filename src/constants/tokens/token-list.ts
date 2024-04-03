export const tokenList = [
  {
    symbol: "WETH",
    thumbnail: "/assets/images/weth.png",
    decimals: 18,
    token_address: null,
    lendApy: 0,
    borrowApy: 0,
  },
  {
    symbol: "USDC",
    thumbnail: "/assets/images/usdc.png",
    decimals: 6,
    token_address: null,
    lendApy: 0,
  },
  {
    symbol: "ETH",
    thumbnail: "/assets/images/eth.png",
    decimals: 18,
    token_address: null,
    lendApy: 0,
    borrowApy: 0,
  },
  {
    symbol: "USDT",
    thumbnail: "/assets/images/usdt.png",
    decimals: 6,
    token_address: null,
    lendApy: 0,
    borrowApy: 0,
  },
  {
    symbol: "WBTC",
    thumbnail: "/assets/images/wbtc.png",
    decimals: 8,
    token_address: null,
    lendApy: 0,
    borrowApy: 0,
  },
];

export const tokenBalance = tokenList.map((token) => {
  return { ...token, balance: "0" };
});
