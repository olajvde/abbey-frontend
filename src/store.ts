import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './api/authSlice';
import { accountsSlice } from './api/accountsSlice';

export const store = configureStore({
    reducer:{
       [authSlice.reducerPath]: authSlice.reducer,
       [accountsSlice.reducerPath]: accountsSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authSlice.middleware, accountsSlice.middleware),
})


