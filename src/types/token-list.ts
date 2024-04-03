export type TTokenList = {
  thumbnail: string;
  symbol: string;
  token_address: string | null;
  decimals: number;
  lendApy?: number;
  borrowApy?: number;
};

export type TTokenBalance = TTokenList & {
  balance: string;
};
