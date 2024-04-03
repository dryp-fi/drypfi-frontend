import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { tokenBalance } from '@/constants/tokens/token-list';

import { TTokenBalance } from '@/types/token-list';

type TInitialState = {
  tokensBalance: Array<TTokenBalance>;
};

const initialState: TInitialState = {
  tokensBalance: tokenBalance,
};

const tokenSlice = createSlice({
  name: 'TOKENS',
  initialState,
  reducers: {
    setTokenList: (state, action: PayloadAction<Array<TTokenBalance>>) => {
      state.tokensBalance = action.payload;
    },
  },
});

export default tokenSlice.reducer;
export const tokenActions = tokenSlice.actions;
