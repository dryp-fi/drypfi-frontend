import { configureStore } from '@reduxjs/toolkit';

import tokenReducer from './features/token-slice';

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
  },
});
